import { GameLayoutModule } from './game-layout.module';

describe('GameLayoutModule', () => {
  let gameLayoutModule: GameLayoutModule;

  beforeEach(() => {
    gameLayoutModule = new GameLayoutModule();
  });

  it('should create an instance', () => {
    expect(gameLayoutModule).toBeTruthy();
  });
});
