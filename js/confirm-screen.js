import ConfirmView from './confirm-view';

class ConfirmScreen {
  constructor(onFirstScreen) {
    this.onFirstScreen = onFirstScreen;
  }

  show() {
    this.confirmModal = new ConfirmView(this.onFirstScreen);
    return this.confirmModal.show();
  }
}

export default ConfirmScreen;
