import React, { useState } from 'react';
import CustomButton from './Button';

interface ChallengeProps {
    onSuccess: () => void;
}

const MathChallenge: React.FC<ChallengeProps> = ({ onSuccess }) => {
    const [problem, setProblem] = useState(generateMathProblem());
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (parseFloat(answer) === problem.answer) {
            setError('');
            onSuccess();
        } else {
            setError('Neteisingai!');
            setProblem(generateMathProblem());
        }
    };

    return (
        <div className="math-challenge">
            <div>
                <label className="block mb-2 text-sm font-medium text-white">Išspręsk matematinį klausimą: {problem.question}</label>
                <input type="text" className=" border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Atsakymas" required value={answer} onChange={(e) => setAnswer(e.target.value)} />
            </div>
            <CustomButton className='m-2' onClick={handleSubmit} btnText="Patvirtinti" size="small" />
            {error && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{error}</span></p>}
        </div>
    );
};

export default MathChallenge;

// Helper function
const generateMathProblem = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];
    let answer;
    switch (operator) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        case '*':
            answer = num1 * num2;
            break;
    }
    return { question: `${num1} ${operator} ${num2}`, answer };
};