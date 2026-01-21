import React from 'react'
import '../index.css'

const WindowFrame = ({ children, title = "Reminders" }) => {
    return (
        <div className="mac-window glass-panel">
            <div className="mac-titlebar">
                <div className="mac-traffic-lights">
                    <div className="mac-light mac-red"></div>
                    <div className="mac-light mac-yellow"></div>
                    <div className="mac-light mac-green"></div>
                </div>
                <div className="mac-window-title">{title}</div>
                <div className="mac-spacer"></div>
            </div>
            <div className="mac-window-content">
                {children}
            </div>

            <style>{`
        .mac-window {
          width: 800px;
          height: 600px;
          border-radius: var(--mac-radius);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: var(--mac-shadow);
          animation: popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mac-titlebar {
          height: 44px; /* Standard Mac titlebar height */
          display: flex;
          align-items: center;
          padding: 0 16px;
          flex-shrink: 0;
          /* Slightly more opaque for the titlebar/toolbar area */
          background: rgba(255, 255, 255, 0.4); 
          border-bottom: 1px solid rgba(0,0,0,0.05);
          -webkit-app-region: drag; /* Electron-ready :) */
        }

        .mac-traffic-lights {
          display: flex;
          gap: 8px;
          margin-right: 16px;
        }

        .mac-light {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 0.5px solid rgba(0,0,0,0.1);
        }

        .mac-red { background-color: #FF5F57; }
        .mac-red:hover { background-color: #FF3B30; }
        
        .mac-yellow { background-color: #FEBC2E; }
        .mac-yellow:hover { background-color: #FFCC00; }
        
        .mac-green { background-color: #28C840; }
        .mac-green:hover { background-color: #34C759; }

        .mac-window-title {
          font-weight: 500;
          font-size: 13px;
          color: var(--mac-text);
          opacity: 0.8;
          width: 100%;
          text-align: center;
          /* Offset for lights to center properly */
          margin-left: -52px; 
        }

        .mac-window-content {
          flex: 1;
          display: flex;
          overflow: hidden;
          position: relative;
        }

        @keyframes popIn {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
        </div>
    )
}

export default WindowFrame
