import { GameLogModule } from './game-log.module';

describe('GameLogModule', () => {
  let gameLogModule: GameLogModule;

  beforeEach(() => {
    gameLogModule = new GameLogModule();
  });

  it('should create an instance', () => {
    expect(gameLogModule).toBeTruthy();
  });
});
