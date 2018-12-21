import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import Money from '../../assets/images/money.svg';
import Bulb from '../../assets/images/light-bulb.svg';
import wrong from '../../assets/images/close-field.svg';

export const gamifyBadge = (image, name, description) => {
  Alert.info(
    `<div class="badgeview-wrapper mr-2">
        <img src=${image} alt="badge" class="badge-image mr-4" />
        <div class="badge-details">
          <div class="badge-title">${name}</div>
          <p class="badge-description">${description}</p>
        </div>
      </div>`,
    {
      html: true,
      position: 'bottom-right',
      effect: 'slide',
      onShow: () => {
      },
      beep: false,
      timeout: 'none'
    }
  );
};

export const gamifyPoints = (score, dynamicData) => {
  Alert.info(
    `<div class="badgeview-wrapper mr-2">
        <img src=${Money} alt="badge" class="badge-image mr-4" />
        <div class="badge-details">
          <div class="badge-title">Awesome!</div>
          <p class="badge-description">
            You have earned ${score} points for completing this ${dynamicData}.
          </p>
        </div>
        <div class="points-add-popup d-flex flex-row align-items-center justify-content-center">
          <span class="point">
            $ ${score}
          </span>
        </div>
      </div>`,
    {
      html: true,
      position: 'bottom-right',
      effect: 'slide',
      onShow: () => {
      },
      beep: false,
      timeout: 3000
    }
  );
};

export const gamifyAssessmentMessage = description => {
  Alert.info(
    `<div class="hintAlert-wrapper mr-2">
      <div class="badge-details mb-2">
        <img src=${wrong} alt="badge" class="badge-cross-image mr-2" />
        <div class="badge-title">INCORRECT ANSWER</div>
      </div>
        <div>
          <p class="badge-description">${description}</p>
        </div>
      </div>`,
    {
      html: true,
      position: 'top-right',
      effect: 'slide',
      onShow: () => {
      },
      beep: false,
      timeout: 'none'
    }
  );
};

export const hintAlert = (hint, closeAlertCb) => {
  Alert.info(
    `<div class="hintAlert-wrapper mr-2">
      <div class="badge-details mb-2">
        <img src=${Bulb} alt="badge" class="badge-image mr-2" />
        <div class="badge-title">HINT</div>
      </div>
      <div>
        <p class="badge-description">${hint}</p>
      </div>
    </div>`,
    {
      html: true,
      position: 'top-right',
      effect: 'slide',
      onShow: () => {
      },
      onClose: () => {
        closeAlertCb();
      },
      beep: false,
      timeout: 'none'
    }
  );
};
// export const hintAlert = ({ hint, goToNextQuestion }) => {
//   const showAlert = () => {
//     Alert.info(
//       `<div class="hintAlert-wrapper mr-2">
//         <div class="badge-details mb-2">
//           <img src=${Bulb} alt="badge" class="badge-image mr-2" />
//           <div class="badge-title">HINT</div>
//         </div>
//         <div>
//           <p class="badge-description">${hint}</p>
//         </div>
//         <button
//           class="btn btn-primary"
//           onclick="${goToNextQuestion()}"
//         >
//           Skip Question
//         </button>
//         </div>`,
//       {
//         html: true,
//         position: 'top-right',
//         effect: 'slide',
//         onShow: () => {
//         },
//         beep: false,
//         timeout: 'none'
//       }
//     );
//   };

//   return (
//     showAlert()
//   );
// };

export const closeAllAlert = () => {
  Alert.closeAll();
};

module.exports = {
  gamifyBadge,
  gamifyPoints,
  gamifyAssessmentMessage,
  hintAlert,
  closeAllAlert
};
