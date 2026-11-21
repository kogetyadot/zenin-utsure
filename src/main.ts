import './styles/main.css';
import { GameEngine } from './game/GameEngine';

function bootstrap(): void {
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement | null;
  const uiRoot = document.getElementById('ui-root');
  if (!canvas || !uiRoot) {
    throw new Error('Required #game-canvas or #ui-root element missing in index.html');
  }

  const engine = new GameEngine(canvas, uiRoot);

  // Clean up on hot-reload if Vite HMR disposes module
  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      engine.dispose();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
} else {
  bootstrap();
}
