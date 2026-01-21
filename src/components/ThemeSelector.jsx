import './ThemeSelector.css';
import { FiCheck } from 'react-icons/fi';

const ThemeSelector = ({ currentTheme, onThemeChange, onClose }) => {
    const themes = [
        { id: 'blue', name: 'Ocean Blue', color: '#007AFF', gradient: 'linear-gradient(135deg, #007AFF, #0051D5)' },
        { id: 'purple', name: 'Royal Purple', color: '#AF52DE', gradient: 'linear-gradient(135deg, #AF52DE, #8E3FBE)' },
        { id: 'pink', name: 'Sunset Pink', color: '#FF2D55', gradient: 'linear-gradient(135deg, #FF2D55, #D70035)' },
        { id: 'orange', name: 'Vibrant Orange', color: '#FF9500', gradient: 'linear-gradient(135deg, #FF9500, #CC7700)' },
        { id: 'green', name: 'Forest Green', color: '#34C759', gradient: 'linear-gradient(135deg, #34C759, #248A3D)' },
        { id: 'teal', name: 'Ocean Teal', color: '#5AC8FA', gradient: 'linear-gradient(135deg, #5AC8FA, #32A0D8)' },
        { id: 'red', name: 'Crimson Red', color: '#FF3B30', gradient: 'linear-gradient(135deg, #FF3B30, #D70015)' },
        { id: 'yellow', name: 'Golden Yellow', color: '#FFCC00', gradient: 'linear-gradient(135deg, #FFCC00, #CCA300)' },
    ];

    return (
        <div className="theme-selector-overlay" onClick={onClose}>
            <div className="theme-selector glass" onClick={(e) => e.stopPropagation()}>
                <div className="theme-header">
                    <h3>Choose Theme</h3>
                    <p>Customize your app appearance</p>
                </div>

                <div className="theme-grid">
                    {themes.map((theme) => (
                        <button
                            key={theme.id}
                            className={`theme-option ${currentTheme === theme.id ? 'active' : ''}`}
                            onClick={() => {
                                onThemeChange(theme.id);
                                setTimeout(onClose, 300);
                            }}
                        >
                            <div
                                className="theme-preview"
                                style={{ background: theme.gradient }}
                            >
                                {currentTheme === theme.id && (
                                    <FiCheck className="check-icon" />
                                )}
                            </div>
                            <span className="theme-name">{theme.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ThemeSelector;
