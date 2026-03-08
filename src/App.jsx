import { useState } from 'react';
import { Sparkles, Utensils, Key, Heart, Zap } from 'lucide-react';
import ImageAnalyzer from './components/ImageAnalyzer';
import DietPlanner from './components/DietPlanner';

function App() {
    const [apiKey, setApiKey] = useState('');
    const [isKeySet, setIsKeySet] = useState(false);
    const [activeTab, setActiveTab] = useState('calories');
    const [inputKey, setInputKey] = useState('');

    const handleKeySubmit = (e) => {
        e.preventDefault();
        if (inputKey.trim().length > 0) {
            setApiKey(inputKey.trim());
            setIsKeySet(true);
        }
    };

    const handleDemoKey = () => {
        const demoKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (demoKey) {
            setApiKey(demoKey);
            setIsKeySet(true);
        }
    };

    return (
        <div className="App">
            <header style={{ marginBottom: '2rem' }}>
                <h1 className="title-gradient" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                    AI Fitness Buddy 🧘‍♀️
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#666' }}>
                    Your personal AI trainer & nutritionist! Created with ❤️ by Shubhangi Gupta
                </p>
            </header>

            <main>
                {!isKeySet ? (
                    <div className="glass-panel animate-fade-in" style={{ maxWidth: '500px', margin: '0 auto' }}>
                        <h2 style={{ marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>Let's get started! 🚀</h2>
                        <p style={{ marginBottom: '1.5rem', color: '#666' }}>
                            Choose how you'd like to power the AI magic ✨
                        </p>

                        {/* Demo Key Button */}
                        <button
                            onClick={handleDemoKey}
                            className="btn-primary"
                            style={{
                                width: '100%',
                                marginBottom: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                padding: '0.9rem',
                                fontSize: '1rem',
                            }}
                        >
                            <Zap size={18} fill="white" />
                            ⚡ Use Demo Key — Instant Access
                        </button>

                        {/* Divider */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
                            <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }} />
                            <span style={{ color: '#aaa', fontSize: '0.85rem' }}>or use your own key</span>
                            <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }} />
                        </div>

                        {/* Custom Key Form */}
                        <form onSubmit={handleKeySubmit}>
                            <div style={{ position: 'relative', marginBottom: '1rem' }}>
                                <Key size={20} style={{ position: 'absolute', left: '12px', top: '14px', color: '#999' }} />
                                <input
                                    type="password"
                                    placeholder="Paste your Gemini API Key here..."
                                    value={inputKey}
                                    onChange={(e) => setInputKey(e.target.value)}
                                    style={{ paddingLeft: '40px' }}
                                />
                            </div>
                            <button
                                type="submit"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: '12px',
                                    border: '2px solid var(--primary)',
                                    background: 'white',
                                    color: 'var(--primary-dark)',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <Key size={16} /> Use My API Key
                            </button>
                        </form>

                        <p style={{ fontSize: '0.8rem', marginTop: '1rem', color: '#888', textAlign: 'center' }}>
                            Get your free key from{' '}
                            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-dark)' }}>
                                Google AI Studio
                            </a>
                        </p>
                    </div>
                ) : (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <button
                                onClick={() => setActiveTab('calories')}
                                style={{
                                    padding: '1rem 2rem',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: activeTab === 'calories' ? 'linear-gradient(45deg, var(--primary), var(--primary-dark))' : 'white',
                                    color: activeTab === 'calories' ? 'white' : 'var(--text)',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    boxShadow: activeTab === 'calories' ? '0 5px 15px rgba(255, 105, 180, 0.4)' : 'none',
                                    transition: 'all 0.3s'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Sparkles size={20} /> Calorie Counter
                                </div>
                            </button>

                            <button
                                onClick={() => setActiveTab('diet')}
                                style={{
                                    padding: '1rem 2rem',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: activeTab === 'diet' ? 'linear-gradient(45deg, var(--accent), #5f9ea0)' : 'white',
                                    color: activeTab === 'diet' ? 'white' : 'var(--text)',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    boxShadow: activeTab === 'diet' ? '0 5px 15px rgba(135, 206, 235, 0.4)' : 'none',
                                    transition: 'all 0.3s'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Utensils size={20} /> Gym Diet Plans
                                </div>
                            </button>
                        </div>

                        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                            {activeTab === 'calories' ? (
                                <ImageAnalyzer apiKey={apiKey} />
                            ) : (
                                <DietPlanner apiKey={apiKey} />
                            )}
                        </div>
                    </div>
                )}
            </main>

            <footer style={{ marginTop: '4rem', padding: '2rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#888' }}>
                    Made with <Heart size={16} fill="var(--primary)" color="var(--primary)" /> by Shubhangi
                </p>
            </footer>
        </div>
    );
}

export default App;