import {ReactiveController, state} from '@snar/lit'

const states = ['stop', 'play', 'pause'] as const
type PlayerState = (typeof states)[number]

export class Player extends ReactiveController {
	@state() state: PlayerState = 'stop'

	play() {
		if (this.state === 'stop' || this.state === 'pause') {
			this.state = 'play'
			this.loop()
		}
	}

	pause() {
		if (this.state === 'play') {
			this.state = 'pause'
		}
	}

	stop() {
		if (this.state === 'play' || this.state === 'pause') {
			this.state = 'stop'
		}
	}

	loop = async () => {
		if (this.state !== 'play') return

		// ... your logic here ...

		await new Promise((r) => setTimeout(r, 10))
		requestAnimationFrame(this.loop)
	}
}
