/**
 * Файл button-view.js управляет тем, как выглядит и ведёт себя Button.
 * Файл dialog-view.js управляет тем, как выглядит и ведёт себя Dialog.
 * Для того, чтобы показать экран, мы создаём новые объекты —
 * ButtonView и DialogView и переопределяем интересующие нас коллбэки.
 * Таким образом ButtonView и DialogView описывают поведение кнопки и
 * диалога в нашем приложении и предоставляют инструменты,
 * которые помогают описать нужное нам поведение, которое задаёт этот модуль
 **/
import ButtonView from './button-view';
import DialogView from './dialog-view';
import {show} from './util';

export default () => {
  const myButton = new ButtonView(`Заманчивое предложение`);
  const myDialog = new DialogView(`Привет!`, `Придёшь к нам ещё?`);

  myDialog.onConfirm = () => console.log(`Ура, пользователь согласился!`);
  myDialog.onCancel = () => console.log(`Ой-ой, пользователь отказался =(`);

  myButton.onClick = () => show(myDialog);

  show(myButton);
};
