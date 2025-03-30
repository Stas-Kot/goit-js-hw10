import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const { delay, state } = e.target.elements;

  promice(delay.value, state.value)
    .then(delay =>
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        icon: '',
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'green',
        transitionIn: 'fadeIn',
      })
    )
    .catch(delay =>
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        icon: '',
        position: 'topRight',
        messageColor: 'white',
        transitionIn: 'fadeIn',
      })
    );

  e.target.reset();
}

function promice(delay, state) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        res(delay);
      }
      rej(delay);
    }, delay);
  });
}
