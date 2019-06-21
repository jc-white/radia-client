/// <reference path="../../../../../../node_modules/phaser/types/phaser.d.ts" />
import 'phaser';
//import * as Easystar from 'easystarjs';
import {Dictionary} from 'lodash';
import {BehaviorSubject} from 'rxjs';
import * as _ from 'lodash';
import * as tippy from 'tippy.js';
import {GameConfig} from '../../../../config/game.config';
import {ICoordPair} from '../explore.interface';
import {PacketReceiveLoadMap, PacketReceiveMoveSuccess} from '../explore.packets';

export type TiledPolyShape = Dictionary<ICoordPair>;

interface TiledPolyLine {
	height: number;
	id: number;
	name: string;
	polyline: TiledPolyShape;
	rotation: number;
	type: string;
	visible: boolean;
	width: number;
	x: number;
	y: number;
}

const WorldMapLoader = {
	preload() {
		WorldMap.preload(this);
	},

	create() {
		WorldMap.create(this);
	},

	update() {
		WorldMap.update(this);
	}
};

export class WorldMap {
	static game: Phaser.Game                     = null;
	static scene: Phaser.Scene                   = null;
	static map: Phaser.Tilemaps.Tilemap          = null;
	static tiles: Phaser.Tilemaps.Tileset        = null;
	static player: PlayerMarker                  = null;
	static tileMarker: TileMarker                = null;
	static camera: Phaser.Cameras.Scene2D.Camera = null;
	//static finder: Easystar.js                   = new Easystar.js();

	static layers: Dictionary<Phaser.Tilemaps.StaticTilemapLayer> = {};
	static regions: Array<MapRegion>                              = [];

	static mouseInGame: boolean              = false;
	static loaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	static initialMap: PacketReceiveLoadMap;

	static socket;

	static lastPointerTileX: number;
	static lastPointerTileY: number;
	static currentRegion: MapRegion;

	static load() {
		this.game = new Phaser.Game({
			type:   Phaser.AUTO,
			width:  500,
			height: 500,
			parent: 'world-map-container',
			scene:  {
				preload: WorldMapLoader.preload,
				create:  WorldMapLoader.create,
				update:  WorldMapLoader.update
			}
		});
	}

	static unload() {
		this.game.destroy(true);
		this.game = null;
	}

	static setMap(mapData: PacketReceiveLoadMap) {
		this.initialMap = mapData;
	}

	static preload(scene: Phaser.Scene) {
		this.scene = scene;

		scene.load.image('dwarf', `${GameConfig.staticsUrl}/sprites/test-dwarf.png`, null);
		scene.load.image('tiles', `${GameConfig.staticsUrl}/tilesets/${this.initialMap.tileset}.png`, null);
		scene.load.tilemapTiledJSON('map', `${GameConfig.staticsUrl}/tilemaps/${this.initialMap.id}.json`, null);
	}

	static create(scene: Phaser.Scene) {
		this.initTilemap();
		this.initCamera();
		this.initPlayer();
		this.initEventHandlers();
		//this.initPathing();
		this.initRegions();
		this.initTileMarker();

		this.loaded$.next(true);
	}

	static update(scene: Phaser.Scene) {
		if (!this.mouseInGame) {
			this.tileMarker.hide();

			/*			if (this.currentRegion) {
							this.currentRegion.clear();
						}*/
		} else {
			this.tileMarker.show();
		}

		const worldPoint = scene.input.activePointer.positionToCamera(this.camera, {}) as ICoordPair;

		const x = _.round(worldPoint.x),
		      y = _.round(worldPoint.y);

		// Rounds down to nearest tile
		const pointerTileX = Math.max(0, this.map.worldToTileX(x)),
		      pointerTileY = Math.max(0, this.map.worldToTileY(y));

		if (pointerTileX != this.lastPointerTileX || pointerTileY != this.lastPointerTileY || (this.currentRegion && this.currentRegion.fillCount < 10)) {
			this.tileMarker.setPos(pointerTileX, pointerTileY);
			let inRegion = false;

			if (this.currentRegion && this.isPointInRegion(x, y, this.currentRegion)) {
				inRegion = true;

				if (this.currentRegion && this.currentRegion.fillCount < 10) {
					this.currentRegion.show();
					RegionTooltip.updateText(this.currentRegion.tiledObject.name);
					RegionTooltip.show();
				}
			} else {
				if (this.currentRegion && !this.isPointInRegion(x, y, this.currentRegion)) {
					console.log('Current region set but pointer not in current region', x, y);
				}

				this.regions.forEach(region => {
					if (this.isPointInRegion(x, y, region)) {
						region.show();

						RegionTooltip.updateText(region.tiledObject.name);
						RegionTooltip.show();
						inRegion = true;

						this.currentRegion = region;
					} else {
						console.log('Not in region', region.tiledObject.name);
						region.clear();
					}
				});
			}

			if (!inRegion) {
				RegionTooltip.hide();
				this.currentRegion = null;
			}

			this.lastPointerTileX = pointerTileX;
			this.lastPointerTileY = pointerTileY;

		}
	}

	static initTilemap() {
		this.map   = this.scene.make.tilemap({key: 'map'});
		this.tiles = this.map.addTilesetImage(this.initialMap.tileset, 'tiles');

		this.layers.background = this.map.createStaticLayer('backgroundLayer', this.tiles, 0, 0);
		this.layers.detail     = this.map.createStaticLayer('detailLayer', this.tiles, 0, 0);
		//this.layers.collision  = this.map.createStaticLayer('collisionLayer', this.tiles, 0, 0);

		//this.layers.collision.alpha = 0; //Make the collision map invisible
	}

	static initCamera() {
		this.camera = this.scene.cameras.main;
		this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);


		setTimeout(() => {
			this.camera.setRoundPixels(true);

			console.log(this.camera);
		}, 100);
	}

	static initPlayer() {
		this.player = new PlayerMarker(this.scene);
		this.camera.startFollow(this.player.graphic);
	}

	static initTileMarker() {
		this.tileMarker = new TileMarker(this.scene);
	}

	static initEventHandlers() {
		this.scene.input.on('pointerup', this.handleClick.bind(this));

		document.getElementsByTagName('canvas')[0].addEventListener('mouseout', this.handleMouseOut.bind(this));
		document.getElementsByTagName('canvas')[0].addEventListener('mouseover', this.handleMouseOver.bind(this));
	}

	static initRegions() {
		const regionsLayer = this.map.objects.filter(layer => layer.name == 'regionLayer')[0];

		this.regions = (regionsLayer.objects as Array<any>)
			.filter(object => object.properties && object.properties.regionID)
			.map(region => new MapRegion(region, this.scene));

		console.log(this.regions);

		RegionTooltip.create();
	}

	static handleClick(pointer: Phaser.Input.Pointer) {
		const worldPoint = pointer.positionToCamera(this.camera, {}) as ICoordPair;

		const worldX = _.round(worldPoint.x),
		      worldY = _.round(worldPoint.y),
		      toX    = Math.floor(worldX / 24),
		      toY    = Math.floor(worldY / 24);

		if (this.currentRegion && this.isPointInRegion(worldX, worldY, this.currentRegion)) {
			this.currentRegion.show();
		}

		this.socket.emit('move', {x: toX, y: toY});
	}

	static handleMouseOut(event: Event) {
		this.mouseInGame = false;

		console.log('Mouse out of game');

		//TODO: For some reason the mouseOut event is randomly firing on click, which causes the current region to clear its highlighted state.
		//Until this is fixed, we'll just not have the highlight/tooltip clear on mouse out.
		/*		this.regions.forEach(region => {
					region.clear();
				});

				RegionTooltip.hide();*/
	}

	static handleMouseOver(event: Event) {
		this.mouseInGame = true;
	}

	static toWorldTileCenter(tileX: number, tileY: number) {
		return [(tileX * 24) + 12, (tileY * 24) + 12];
	}

	static initPathing() {
/*		const grid: Array<Array<number>> = [];

		for (let y = 0; y < this.map.height; y++) {
			let col = [];

			for (let x = 0; x < this.map.width; x++) {
				col.push(this.getTileID(x, y));
			}

			grid.push(col);
		}

		this.finder.setGrid(grid);
		this.setAcceptableTiles();*/
	}

	static setAcceptableTiles() {
/*		const tileset         = this.map.tilesets[0],
		      properties      = tileset.tileProperties,
		      acceptableTiles = [];

		for (let i = tileset.firstgid - 1; i < this.tiles.total; i++) { // firstgid and total are fields from Tiled that indicate the range of IDs that the tiles can take in that tileset
			if (!properties.hasOwnProperty(i)) {
				// If there is no property indicated at all, it means it's a walkable tile
				acceptableTiles.push(i + 1);
				continue;
			}
			if (!properties[i].collide) acceptableTiles.push(i + 1);
			if (properties[i].cost) this.finder.setTileCost(i + 1, properties[i].cost); // If there is a cost attached to the tile, let's register it
		}

		console.log('Acceptable tiles', acceptableTiles);

		this.finder.setAcceptableTiles(acceptableTiles);*/
	}

	static getTileID(tileX: number, tileY: number) {
		const tile = this.map.getTileAt(tileX, tileY, true, this.layers.background as any);

		if (!tile) {
			console.log('Could not find tile at ', tileX, tileY, this.map);
			return null;
		}

		return tile.index;
	}

	static tileCollides(tileX: number, tileY: number) {
		const tile = this.map.getTileAt(tileX, tileY, true, this.layers.background as any);

		if (!tile) {
			console.log('Could not find tile at ', tileX, tileY, this.map);
			return false;
		}

		return tile.properties['collide'];
	}

	static tiledPolylineToWorld(poly: TiledPolyLine): Array<Array<number>> {
		if (_.isEmpty(poly)) return [];

		const points = Object.values(poly.polyline);

		return points.map(point => {
			return [poly.x + point.x, poly.y + point.y];
		});
	}

	static tiledPolylineToLocal(poly: TiledPolyLine): Array<Array<number>> {
		if (_.isEmpty(poly)) return [];

		const points = Object.values(poly.polyline);

		return points.map(point => {
			return [point.x, point.y];
		});
	}

	static isPointInRegion(worldX: number, worldY: number, region: MapRegion): boolean {
		// ray-casting algorithm based on
		// http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
		const point = [worldX, worldY],
		      vs    = region.worldPoly || this.tiledPolylineToWorld(region.tiledObject);

		let x = point[0], y = point[1];

		let inside = false;

		for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
			let xi = vs[i][0], yi = vs[i][1],
			    xj                = vs[j][0], yj = vs[j][1];

			let intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
			if (intersect) inside = !inside;
		}

		return inside;
	}
}

export class PlayerMarker {
	graphic: Phaser.GameObjects.Sprite;
	scene: Phaser.Scene;
	currentTimeline: Phaser.Tweens.Timeline;

	constructor(scene: Phaser.Scene) {
		this.scene   = scene;
		this.graphic = this.scene.add.sprite(0, 0, 'dwarf');
	}

	get x() {
		return this.graphic.x;
	}

	get y() {
		return this.graphic.y;
	}

	setLocation(tileX: number, tileY: number) {
		let [x, y] = WorldMap.toWorldTileCenter(tileX, tileY);

		this.graphic.setX(x);
		this.graphic.setY(y);
	}

	move(path: PacketReceiveMoveSuccess) {
		const tweens = [];

		if (this.currentTimeline) {
			this.currentTimeline.stop();
		}

		if (path.length > 1) {
			for (let i = 0; i < path.length - 1; i++) {
				let ex = path[i + 1].x,
				    ey = path[i + 1].y;

				tweens.push({
					targets: this.graphic,
					x:       {value: ex * WorldMap.map.tileWidth + 12, duration: 200},
					y:       {value: ey * WorldMap.map.tileHeight + 12, duration: 200}
				});
			}
		} else {
			let ex = path[0].x,
			    ey = path[0].y;

			tweens.push({
				targets: this.graphic,
				x:       {value: ex * WorldMap.map.tileWidth + 12, duration: 200},
				y:       {value: ey * WorldMap.map.tileHeight + 12, duration: 200}
			});
		}

		this.currentTimeline = this.scene.tweens.timeline({
			tweens: tweens
		});
	}
}

export class TileMarker {
	graphic: Phaser.GameObjects.Graphics;
	scene: Phaser.Scene;

	constructor(scene: Phaser.Scene) {
		this.scene   = scene;
		this.graphic = this.scene.add.graphics(null);

		this.graphic.lineStyle(2, 0xffffff, 1);
		this.graphic.strokeRect(0, 0, WorldMap.map.tileWidth, WorldMap.map.tileHeight);
	}

	setPos(tileX: number, tileY: number) {
		this.graphic.x = WorldMap.map.tileToWorldX(tileX);
		this.graphic.y = WorldMap.map.tileToWorldY(tileY);
	}

	hide() {
		this.graphic.setVisible(false);
	}

	show() {
		this.graphic.setVisible(true);
	}
}

export class MapRegion {
	tiledObject: TiledPolyLine;
	graphic: Phaser.GameObjects.Graphics;
	worldPoly: Array<Array<number>>;
	localPoly: Array<Array<number>>;
	scene: Phaser.Scene;

	shown: boolean    = false;
	fillCount: number = 0;

	constructor(polyline: TiledPolyLine, scene: Phaser.Scene) {
		this.scene       = scene;
		this.tiledObject = polyline;
		this.worldPoly   = WorldMap.tiledPolylineToWorld(this.tiledObject);
		this.localPoly   = WorldMap.tiledPolylineToLocal(this.tiledObject);

		this.graphic = this.scene.add.graphics(null);
	}

	show() {
		if (!this.shown) {
			this.graphic.lineStyle(2, 0x292929, 1);

			this.graphic.beginPath();
			this.graphic.moveTo(this.tiledObject.x, this.tiledObject.y);
			this.worldPoly.forEach(point => {
				this.graphic.lineTo(point[0], point[1]);
			});
			this.graphic.closePath();
			this.graphic.strokePath();

			this.shown = true;
		}

		if (this.fillCount < 10) {
			this.graphic.fillStyle(0xffffff, 0.015);
			this.graphic.fillPath();

			this.fillCount++;
		}
	}

	clear() {
		this.graphic.clear();

		this.fillCount = 0;
		this.shown     = false;
	}
}

export class RegionTooltip {
	static tipElement: any    = null;
	static tippyInstance: any = null;

	static create() {
		this.tipElement = {
			attributes: {
				title: 'Nothing'
			},

			getBoundingClientRect() {
				const canvasRect = document.getElementById('worldmap-outer-container').getBoundingClientRect();

				return {
					width:  document.documentElement.clientWidth,
					height: document.documentElement.clientHeight,
					top:    canvasRect.top,
					left:   canvasRect.left,
					right:  canvasRect.right,
					bottom: canvasRect.bottom
				}
			}
		};

		this.tippyInstance = tippy.one(this.tipElement, {
			createPopperInstanceOnInit: true,
			offset:                     '0, -80'
		});
	}

	static updateText(text: string) {
		this.tipElement._tippy.popper.querySelector('.tippy-content').textContent = text;
	}

	static show() {
		if (!this.tipElement._tippy) return;

		this.tipElement._tippy.show();
	}

	static hide() {
		if (!this.tipElement._tippy) return;

		this.tipElement._tippy.hide();
	}
}