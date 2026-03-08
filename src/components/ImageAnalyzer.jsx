import { useState } from 'react';
import { Camera, Sparkles, Loader2, Info } from 'lucide-react';
import { analyzeFoodImage } from '../services/GeminiService';

const ImageAnalyzer = ({ apiKey }) => {
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleImageUpload = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setImage(URL.createObjectURL(selectedFile));
            setResult(null); // Reset previous result
            setError('');
        }
    };

    const handleAnalyze = async () => {
        if (!file) {
            setError('Please upload a tasty photo first! 📸');
            return;
        }
        if (!apiKey) {
            setError('Babu, I need your API key to work my magic! ✨');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const analysis = await analyzeFoodImage(file, apiKey);
            setResult(analysis);
        } catch (err) {
            console.error(err);

            const message = String(err?.message || '');

            if (message.toLowerCase().includes('quota') || message.includes('429')) {
                 setError(
            "Looks like your Gemini API quota is over or not enabled. Check your plan/billing in Google AI Studio. 💳"
            );
            } else {
            setError('Oops! Something went wrong. Maybe try another photo? 🥺');
            }
        }finally {
             setLoading(false);
            }
        };

    return (
        <div className="glass-panel animate-fade-in">
            <div style={{ marginBottom: '2rem' }}>
                <h2 className="title-gradient" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                    AI Calorie Tracker 🍱
                </h2>
                <p>Snap a pic, and I'll tell you what's on your plate!</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                {/* Upload Area */}
                <label
                    htmlFor="food-upload"
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        height: '250px',
                        border: '3px dashed var(--primary)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {image ? (
                        <img
                            src={image}
                            alt="Food Preview"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <div style={{ textAlign: 'center', color: 'var(--primary-dark)' }}>
                            <Camera size={48} />
                            <p style={{ marginTop: '0.5rem', fontWeight: 600 }}>Tap to Upload Food</p>
                        </div>
                    )}
                    <input
                        id="food-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                    />
                </label>

                {/* Analyze Button */}
                <button
                    className="btn-primary"
                    onClick={handleAnalyze}
                    disabled={loading}
                    style={{ width: '100%', maxWidth: '300px', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" /> Analyzing...
                        </>
                    ) : (
                        <>
                            <Sparkles /> Analyze Calories
                        </>
                    )}
                </button>

                {/* Error Message */}
                {error && (
                    <div style={{ color: 'red', fontWeight: 600 }}>
                        {error}
                    </div>
                )}

                {/* Result Card */}
                {result && (
                    <div className="result-card animate-fade-in" style={{ width: '100%', maxWidth: '500px' }}>
                        {result.isFood ? (
                            <>
                                <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.5rem', marginBottom: '1rem' }}>
                                    {result.foodName}
                                </h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', background: 'var(--secondary)', padding: '0.5rem 1rem', borderRadius: '10px' }}>
                                    <Info size={20} color="var(--primary-dark)" />
                                    <span style={{ fontWeight: 700 }}>{result.calories}</span>
                                </div>

                                <p style={{ marginBottom: '1rem', fontStyle: 'italic', color: '#666' }}>
                                    {result.nutrition}
                                </p>

                                <div style={{ background: '#fff0f5', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                                    <p>✨ {result.description}</p>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>😕 That doesn't look like food!</p>
                                <p>{result.description}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageAnalyzer;

