import React from 'react'
import '../views.scss'
import CloseModal from '../../assets/images/icons/closeModal.svg'
const Modals = ({ children, boolen, height, minHeight, set, maxWidth, cancel = true }) => {
    return (
        <div className='modals'>
            <section className="myModals" id='myModal' aria-labelledby="contained-modal-title-vcenter">
                <div className="myModal__rel" style={{ height, maxWidth, minHeight }}>
                    {cancel &&
                        <div
                            className="myModals__close"
                            hidden={boolen}
                            onClick={() => set(false)}
                        >
                            <img src={CloseModal} alt="img" />
                        </div>
                    }
                    <div className="myModal_item">
                        {children}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Modals