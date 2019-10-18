import React, { useState } from 'react'
import Button from '../button/Button'
import Modal from 'react-modal'
import modalClose from '../../images/modal-close.svg'
import chevronRight from '../../images/carousel/chevron-right.svg'
import chevronLeft from '../../images/carousel/chevron-left.svg'
import ItemsCarousel from 'react-items-carousel'

import './FeatureCards.scss'

import useWindowWidth from '../../hooks/useWindowWith'
import { features } from './features'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    opacity: 1,
    border: 'none',
    background: '#1F1F4B',
    width: '50vw',
    minWidth: '350px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '100vh',
  },
  overlay: { backgroundColor: 'rgba(0, 0, 51, .80)' },
}

const classes = {
  itemWrapper: 'carousel-item-wrapper',
}

export const FeatureCards = ({ numberOfCards }) => {
  const [featureModalOpen, setFeatureModalOpen] = useState(false)
  const [selectedFeatureTitle, setSelectedFeatureTitle] = useState('')
  const [activeItemIndex, setActiveItemIndex] = useState(0)

  const closeModal = () => setFeatureModalOpen(false)
  const openModal = () => setFeatureModalOpen(true)

  const selectedFeature = features.find(
    feature => feature.title === selectedFeatureTitle,
  )
  return (
    <React.Fragment>
      {selectedFeature && (
        <Modal
          isOpen={featureModalOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
          style={customStyles}
        >
          <div className="feature-modal-container">
            <img
              id="close-modal-button"
              src={modalClose}
              alt="close"
              onClick={closeModal}
            />
            <div className="feature-card-title-container">
              <img
                className="feature-modal-icon"
                src={selectedFeature.image}
                alt=""
              />
              <h1> {selectedFeature.title}</h1>
              {selectedFeature.renderDetailedDescription()}
            </div>
          </div>
        </Modal>
      )}
      <div className="feature-card-container carousel-news-article-container">
        <div className="carousel-button-container">
          <img
            src={chevronLeft}
            alt="chevron-left"
            onClick={() => setActiveItemIndex(activeItemIndex - 1)}
          />
          <img
            src={chevronRight}
            alt="chevron-right"
            onClick={() => setActiveItemIndex(activeItemIndex + 1)}
          />
        </div>
        <ItemsCarousel
          requestToChangeActive={index => console.log({ index })}
          activeItemIndex={activeItemIndex}
          numberOfCards={numberOfCards}
          gutter={20}
          infiniteLoop
          classes={classes}
          chevronWidth={40}
        >
          {features.map(feature => (
            <div key={feature.title} className="feature-card">
              <div className="feature-card-title-container">
                <img src={feature.image} alt="" />
                <h1> {feature.title}</h1>
              </div>
              <p>{feature.description}</p>
              <Button
                secondary
                onClick={() => {
                  setSelectedFeatureTitle(feature.title)
                  openModal()
                }}
              >
                Learn More
              </Button>
            </div>
          ))}
        </ItemsCarousel>
      </div>
    </React.Fragment>
  )
}

export default () => {
  const width = useWindowWidth()
  const CARD_WIDTH = 310
  let numberOfCards = Math.floor(width / CARD_WIDTH)
  if (numberOfCards > 4) numberOfCards = 4
  return <FeatureCards numberOfCards={numberOfCards} />
}