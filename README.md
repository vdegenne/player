## Example

```ts
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

	protected async loopCall() {
		/* implementation */
	}
}
export const quizPlayer = new QuizPlayer()

@customElement({name: 'quiz-player-dialog', inject: true})
class QuizPlayerDialog extends PlayerDialog {
	protected renderContent() {
		return html`
			<div>
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
