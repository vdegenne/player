import {html, LitElement, PropertyValues} from 'lit'
import {state} from 'lit/decorators.js'
import {type Player} from './player.js'

export class PlayerDialog extends LitElement {
	@state() open = false
	@state() title = 'Player'

	constructor(protected playerCtrl: Player) {
		super()

		playerCtrl.bind(this)
	}

	#firstImports = false
	protected updated(_changedProperties: PropertyValues): void {
		if (this.open === true && !this.#firstImports) {
			import('@material/web/dialog/dialog.js')
			// import('@material/web/button/text-button.js')
			import('@material/web/iconbutton/icon-button.js')
			import('@material/web/icon/icon.js')
			import('@material/web/button/filled-tonal-button.js')
			this.#firstImports = true
		}
	}

	render() {
		return html`
			<md-dialog ?open=${this.open} @closed=${() => (this.open = false)}>
				<header slot="headline" style="justify-content:space-between">
					<span>${this.title}</span>
					<md-icon-button form="form"><md-icon>close</md-icon></md-icon-button>
				</header>

				<form slot="content" method="dialog" id="form">
					${this.renderContent()}
				</form>

				<div slot="actions">
					${!this.playerCtrl.skipPause &&
					(this.playerCtrl.state === 'play' ||
						this.playerCtrl.state === 'pause')
						? html`
								<md-filled-tonal-button
									@click=${() => (this.playerCtrl.state = 'stop')}
								>
									<md-icon slot="icon">stop</md-icon>
									Stop
								</md-filled-tonal-button>
							`
						: null}
					<md-filled-button
						@click=${() => {
							switch (this.playerCtrl.state) {
								case 'play':
									this.playerCtrl.state = this.playerCtrl.skipPause
										? 'stop'
										: 'pause'
									break
								case 'stop':
								case 'pause':
									this.playerCtrl.state = 'play'
									break
							}
						}}
					>
						${this.playerCtrl.state === 'pause' ||
						this.playerCtrl.state === 'stop'
							? html`<md-icon slot="icon">play_arrow</md-icon> Play`
							: null}
						${this.playerCtrl.state === 'play'
							? this.playerCtrl.skipPause
								? html`<md-icon slot="icon">stop</md-icon> Stop`
								: html`<md-icon slot="icon">pause</md-icon> Pause`
							: null}
					</md-filled-button>
				</div>
			</md-dialog>
		`
	}

	show() {
		this.open = true
	}

	protected renderContent() {
		return html`override renderContent() method to customize content`
	}
}
