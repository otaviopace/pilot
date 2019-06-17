import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'

import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
  Spacing,
} from 'former-kit'

import style from '../../Config/style.css'

import ImageAutomaticOne from './img/automatic_10_25_1.svg'
import ImageAutomaticTwo from './img/automatic_10_25_2.svg'
import ImageAutomaticThree from './img/automatic_10_25_3.svg'
import ImageAutomaticDx from './img/automatic_dx.svg'

const renderManualByVolume = t => (
  <Fragment>
    <h5 className={style.modalSubtitles}>{t('pages.recipient_detail.manual_by_volume')}</h5>
    <p>{t('pages.recipient_detail.manual_by_volume_explanation_1')}</p>
    <p>{t('pages.recipient_detail.manual_by_volume_explanation_2')}</p>
  </Fragment>
)

const renderAutomaticByVolume = t => (
  <Fragment>
    <h5 className={style.modalSubtitles}>{t('pages.recipient_detail.automatic_by_volume')}</h5>
    <p>{t('pages.recipient_detail.automatic_by_volume_explanation_1')}
      <a
        href="https://pagarme.zendesk.com/hc/pt-br/articles/217944383-Qual-percentual-das-vendas-pode-ser-recebido-antecipadamente"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('pages.recipient_detail.automatic_by_volume_explanation_link')}
      </a>
    </p>
  </Fragment>
)

const render1025 = t => (
  <Fragment>
    <h5 className={style.modalSubtitles}>{t('pages.recipient_detail.anticipation_1025')}</h5>
    <p>{t('pages.recipient_detail.anticipation_1025_explanation_1')}</p>
    <div className={style.imgSize}>
      <ImageAutomaticOne />
    </div>
    <ImageAutomaticTwo />
    <ImageAutomaticThree />
  </Fragment>
)

const renderDX = t => (
  <Fragment>
    <h5 className={style.modalSubtitles}>{t('pages.recipient_detail.anticipation_dx')}</h5>
    <p>{t('pages.recipient_detail.anticipation_dx_explanation_1')}</p>
    <ImageAutomaticDx />
  </Fragment>
)

const renderIfManualOrAutomaticModel = (anticipationModel, t) => {
  const manual = (anticipationModel === 'manual')
  const automatic = (anticipationModel === 'automatic')
  if (manual || automatic) {
    return (
      <Fragment>
        {renderManualByVolume(t)}
        <Spacing />
        {renderAutomaticByVolume(t)}
      </Fragment>
    )
  }
  return null
}

const renderIfDxOr1025 = (anticipationModel, t) => {
  const automaticDx = (anticipationModel === 'automatic_dx')
  const automatic1025 = (anticipationModel === 'automatic_1025')
  if (automaticDx || automatic1025) {
    return (
      <Fragment>
        {renderManualByVolume(t)}
        <Spacing />
        {renderAutomaticByVolume(t)}
        <Spacing />
        {render1025(t)}
        <Spacing />
        {renderDX(t)}
      </Fragment>
    )
  }
  return null
}

const HelpModal = ({
  anticipationModel,
  isOpen,
  onExit,
  size,
  t,
  title,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onExit}
    className={style.modalWidth}
    size={size}
  >
    <ModalTitle
      title={title}
      closeIcon={<IconClose width={16} height={16} />}
      onClose={onExit}
    />
    <div className={style.modalHeight}>
      <ModalContent>
        <hr />
        <small className={style.marginBottomforModal}>
          {t('pages.recipient_detail.subtitle_modal')}
        </small>
        {renderIfManualOrAutomaticModel(anticipationModel, t)}
        {renderIfDxOr1025(anticipationModel, t)}
      </ModalContent>
      <ModalActions>
        <div className={style.justifyContent}>
          <Button fill="gradient" onClick={onExit}>
            {t('pages.recipient_detail.exit_modal')}
          </Button>
          <Spacing />
        </div>
      </ModalActions>
    </div>
  </Modal>
)

HelpModal.propTypes = {
  anticipationModel: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onExit: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

HelpModal.defaultProps = {
  anticipationModel: '',
}

export default HelpModal
