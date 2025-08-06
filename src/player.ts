import {type PropertyValues, ReactiveController, state} from '@snar/lit'
import {FormBuilder} from '@vdegenne/forms'

const states = ['stop', 'play', 'pause'] as const
type PlayerState = (typeof states)[number]

export class Player extends ReactiveController {
	@state() state: PlayerState = 'stop'
	@state() skipPause = true

	// F = new FormBuilder(this)

	update(changed: PropertyValues<this>) {
		if (this.state === 'play') {
			if (!this.hasUpdated) {
				this.state = 'pause'
			}
		}
		if (this.state === 'pause') {
			if (this.skipPause) {
				this.state = 'stop'
			}
		}
	}

	updated(changed: PropertyValues<this>) {
		if (changed.has('state')) {
			if (this.state === 'play') {
				this.loop()
			}
		}
	}

	// play() {
	// 	if (this.state === 'stop' || this.state === 'pause') {
	// 		this.state = 'play'
	// 		this.loop()
	// 	}
	// }
	//
	// pause() {
	// 	if (this.state === 'play') {
	// 		this.state = 'pause'
	// 	}
	// }
	//
	// stop() {
	// 	if (this.state === 'play' || this.state === 'pause') {
	// 		this.state = 'stop'
	// 	}
	// }

	protected async loopCall(): Promise<void> {
		// default no-op
	}

	loop = async () => {
		if (this.state !== 'play') return

		await this.loopCall()

		await new Promise((r) => setTimeout(r, 10))
		requestAnimationFrame(this.loop)
	}
}
