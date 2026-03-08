import { useState } from 'react';
import { Dumbbell, Utensils, Loader2, ChevronRight } from 'lucide-react';
import { generateDietPlan } from '../services/GeminiService';

const DietPlanner = ({ apiKey }) => {
    const [formData, setFormData] = useState({
        gender: 'Female',
        weight: '60',
        goal: 'Maintenance',
        dietType: 'Vegetarian',
        budget: 'Medium',
        duration: 1
    });

    const [loading, setLoading] = useState(false);
    const [dietPlan, setDietPlan] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGenerate = async () => {
        if (!apiKey) {
            setError('Babu, I need your API key first! ✨');
            return;
        }
        setLoading(true);
        setError('');
        setDietPlan(null);

        try {
            const plan = await generateDietPlan(formData, apiKey);
            setDietPlan(plan);
        } catch (err) {
            console.error(err);

            const message = String(err?.message || '');

            if (message.toLowerCase().includes('quota') || message.includes('429')) {
                 setError(
            "Looks like your Gemini API quota is over or not enabled. Check your plan/billing in Google AI Studio. 💳"
            );
            } else {
            setError('Oops! Failed to generate diet plan. Please try again.. 🥺');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-panel animate-fade-in">
            <div style={{ marginBottom: '2rem' }}>
                <h2 className="title-gradient" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                    Gym Diet Planner 💪
                </h2>
                <p>Tell me your goals, and I'll clean up your diet!</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem', textAlign: 'left' }}>

                <div>
                    <label style={{ fontSize: '0.9rem', fontWeight: 600, marginLeft: '0.5rem' }}>Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option>Female</option>
                        <option>Male</option>
                        <option>Non-binary</option>
                    </select>
                </div>

                <div>
                    <label style={{ fontSize: '0.9rem', fontWeight: 600, marginLeft: '0.5rem' }}>Weight (kg)</label>
                    <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
                </div>

                <div>
                    <label style={{ fontSize: '0.9rem', fontWeight: 600, marginLeft: '0.5rem' }}>Goal</label>
                    <select name="goal" value={formData.goal} onChange={handleChange}>
                        <option>Weight Loss</option>
                        <option>Muscle Gain</option>
                        <option>Maintenance</option>
                    </select>
                </div>

                <div>
                    <label style={{ fontSize: '0.9rem', fontWeight: 600, marginLeft: '0.5rem' }}>Diet Type</label>
                    <select name="dietType" value={formData.dietType} onChange={handleChange}>
                        <option>Vegetarian</option>
                        <option>Eggetarian</option>
                        <option>Non-Veg</option>
                        <option>Vegan</option>
                    </select>
                </div>

                <div>
                    <label style={{ fontSize: '0.9rem', fontWeight: 600, marginLeft: '0.5rem' }}>Budget</label>
                    <select name="budget" value={formData.budget} onChange={handleChange}>
                        <option>Low (Student Friendly)</option>
                        <option>Medium</option>
                        <option>High (Premium)</option>
                    </select>
                </div>

                <div>
                    <label style={{ fontSize: '0.9rem', fontWeight: 600, marginLeft: '0.5rem' }}>Duration</label>
                    <select name="duration" value={formData.duration} onChange={handleChange}>
                        <option value="1">1 Day</option>
                        <option value="3">3 Days</option>
                        <option value="7">7 Days</option>
                    </select>
                </div>
            </div>

            <button
                className="btn-primary"
                onClick={handleGenerate}
                disabled={loading}
                style={{ width: '100%', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
            >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin" /> Cooking up plan...
                    </>
                ) : (
                    <>
                        <Utensils /> Generate Diet Plan
                    </>
                )}
            </button>

            {error && <p style={{ color: 'red', fontWeight: 600 }}>{error}</p>}

            {/* Results */}
            {dietPlan && (
                <div className="animate-fade-in" style={{ textAlign: 'left' }}>
                    {dietPlan.map((dayPlan, index) => (
                        <div key={index} className="result-card" style={{ marginBottom: '1rem' }}>
                            <h3 style={{ borderBottom: '2px solid var(--secondary)', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>
                                📅 {dayPlan.day}
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {dayPlan.meals.map((meal, mIndex) => (
                                    <div key={mIndex} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                        <div style={{ background: 'var(--secondary)', padding: '0.5rem', borderRadius: '8px', minWidth: '80px', textAlign: 'center', fontWeight: 600 }}>
                                            {meal.time}
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: 700, margin: 0 }}>{meal.food}</p>
                                            <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>{meal.calories}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed #ddd', textAlign: 'right', fontWeight: 700, color: 'var(--primary-dark)' }}>
                                Total: {dayPlan.totalCalories}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DietPlanner;
