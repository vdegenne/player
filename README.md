## Example

```ts
import '@material/web/button/filled-tonal-button.js'
import '@material/web/dialog/dialog.js'
import '@material/web/iconbutton/icon-button.js'
import '@material/web/textfield/filled-text-field.js'
import {state} from '@snar/lit'
import {FormBuilder} from '@vdegenne/forms'
import {Player} from '@vdegenne/player'
import {PlayerDialog} from '@vdegenne/player/player-dialog.js'
import {customElement} from 'custom-element-decorator'
import {html} from 'lit'
import {saveToLocalStorage} from 'snar-save-to-local-storage'
import '@material/web/textfield/outlined-text-field.js'
import {state} from '@snar/lit'
import {FormBuilder} from '@vdegenne/forms'
import {Player} from '@vdegenne/player'
import {PlayerDialog} from '@vdegenne/player/player-dialog.js'
import {customElement} from 'custom-element-decorator'
import {html} from 'lit'
import {saveToLocalStorage} from 'snar-save-to-local-storage'

@saveToLocalStorage('chess-openings-quiz:player')
class QuizPlayer extends Player {
	F = new FormBuilder(this)
	@state() pauseUntilAnswerS = 10

	protected onStop() {
		// cancelSpeech()
	}

	protected async loopCall() {
		/* implementation */
	}
}
export const quizPlayer = new QuizPlayer()

@customElement({name: 'quiz-player-dialog', inject: true})
@withStyles()
class QuizPlayerDialog extends PlayerDialog {
	protected renderContent() {
		return html`
			<div class="flex flex-col gap-3">
				${quizPlayer.F.TEXTFIELD('Pause until answer', 'pauseUntilAnswerS', {
					type: 'number',
					suffixText: 'seconds',
				})}
			</div>
		`
	}
}

export const quizPlayerDialog = new QuizPlayerDialog(quizPlayer)
```

Then use an import to improve code splitting

```ts
export async function openQuizPlayerDialog() {
	const {quizPlayerDialog} = await import('./player.js')
	quizPlayerDialog.show()
}
```
