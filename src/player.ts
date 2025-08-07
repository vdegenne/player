import {type PropertyValues, ReactiveController, state} from '@snar/lit'

const states = ['stop', 'play', 'pause'] as const
type PlayerState = (typeof states)[number]

export class Player extends ReactiveController {
	@state() state: PlayerState = 'stop'
	@state() skipPause = true

	update(_changed: PropertyValues<this>) {
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
			} else if (this.state === 'stop') {
				this.onStop()
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

	protected onStop() {}

	loop = async () => {
		if (this.state !== 'play') return

		await this.loopCall()

		requestAnimationFrame(this.loop)
	}

	protected async wait(ms: number): Promise<void> {
		let waited = 0
		const step = 50 // ms granularity

		while (waited < ms) {
			if (this.state === 'stop') return

			while (this.state === 'pause') {
				await new Promise((r) => setTimeout(r, step))
				if (<any>this.state === 'stop') return
			}

			await new Promise((r) => setTimeout(r, step))
			waited += step
		}
	}
}
