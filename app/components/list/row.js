import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ListRowComponent extends Component {
	tagName = 'tr';
	classNames = ['form-row'];

	@tracked formVisible = false;
	@tracked TR = '2';
	@tracked qualification = '3';
	@tracked paymentFormat = '10';
	@tracked workingConditions = '1';
	@tracked laborAutomation = '1';
	@tracked currentPosition = '1';
	@tracked qualificationEmployee = '1';
	@tracked qualificationEmployeeChecked = false;

	@tracked codeCopied = false;

	get isWorker() {
		return this.item.KOD.charAt(0) === '1';
	}

	get employeeOKPDTR() {
		return this.item.KOD + this.item.KC + this.item.CATEGORY + this.item.OKZ
						+ (this.qualificationEmployeeChecked ? this.currentPosition : this.qualificationEmployee);
	}

	get workerOKPDTR() {
		debugger;
		return this.item.KOD + this.item.KC + this.item.ETKS + this.item.OKZ
						+ this.TR + this.qualification + this.paymentFormat
						+ this.workingConditions + this.laborAutomation;
	}

	@action
	toggleForm() {
		this.toggleProperty('formVisible');
	}

	@action
	setTR(selected) {
		this.TR = selected;
	}

	@action
	setQualification(selected) {
		this.qualification = selected;
	}

	@action
	setPaymentFormat(selected) {
		this.paymentFormat = selected;
	}

	@action
	setWorkingConditions(selected) {
		this.workingConditions = selected;
	}

	@action
	setLaborAutomation(selected) {
		this.laborAutomation = selected;
	}

	@action
	setCurrentPosition(selected) {
		this.currentPosition = selected;
	}

	@action
	setQualificationEmployee(selected) {
		this.qualificationEmployee = selected;
	}

	@action
	toggleQualificationEmployeeChecked() {
		this.toggleProperty('qualificationEmployeeChecked');
	}

	@action
	copyToClipboard() {
		let that = this;

		const okpdtr = (this.isWorker ? this.workerOKPDTR : this.employeeOKPDTR);

		navigator.clipboard.writeText(okpdtr).then(
			() => {
				that.codeCopied = true;

				return new Promise((resolve) => {
					setTimeout(() => {
						resolve(true);
					}, 2000);
				})
			},
			() => {
				console.error('Не удалось скопировать в буфер обмена.');
			}
		).then((copied) => {
			if (copied) {
				that.codeCopied = false;
			}
		});
	}
}
