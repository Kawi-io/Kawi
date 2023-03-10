import { useEffect } from 'react'

interface Props {
  loading: boolean
}

const ModalLoader: React.FC<Props> = ({
  loading,
}) => {
  const backgroundColor = 'rgba(0, 0, 0, 0.6)'
  const loaderColor = 'rgb(112, 163, 173)'
  const loaderSize = 48
  const loaderBorderWidth = 10

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [loading])

  return (
    <>
      {loading && (
        <div className="modal-loader">
          <div className="loader"></div>
        </div>
      )}

      <style jsx>{`
        .modal-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: ${backgroundColor};
          z-index: 9999;
        }

        .modal-loader {
            background-color: ${backgroundColor};
          }
          
          .loader {
            border: ${loaderBorderWidth}px solid rgba(0, 0, 0, 0.2);
            border-top: ${loaderBorderWidth}px solid ${loaderColor};
            border-radius: 50%;
            width: ${loaderSize}px;
            height: ${loaderSize}px;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
      `}</style>
    </>
  )
}

export default ModalLoader