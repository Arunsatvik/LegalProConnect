import { useState } from 'react';
import { HashLoader } from 'react-spinners';
import './ChatUI.css';

const ChatUI = () => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSendClick = async () => {
        setLoading(true);

        const newMessage = { text: userInput, type: 'user' };
        setChatHistory((prevHistory) => [...prevHistory, newMessage]);
        setUserInput('');

        const apiUrl = `CLIENT_SITE_URL=http://ec2-3-82-21-179.compute-1.amazonaws.com:8080/bot/chat?prompt=${encodeURIComponent(userInput)}`;

        try {
            const res = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'text/plain'
                }
            });

            if (res.ok) {
                const data = await res.text();
                const botResponse = { text: data, type: 'bot' };

                setChatHistory((prevHistory) => [...prevHistory, botResponse]);
            } else {
                const errorMessage = { text: "No results found.", type: 'bot' };
                setChatHistory((prevHistory) => [...prevHistory, errorMessage]);
            }
        } catch (error) {
            console.error("There was an error sending the data:", error);
            const errorMessage = { text: "An error occurred while processing your request.", type: 'bot' };
            setChatHistory((prevHistory) => [...prevHistory, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="chat-container">
        <header className="chat-header">
            LegalProConnect AI
        </header>

        <div className="chat-body">
            <div className="chat-history">
                {chatHistory.map((message, index) => (
                    <div key={index} className={`message ${message.type}`}>
                        {message.text}
                    </div>
                ))}
                
                {loading && (
                    <div className="loading-spinner">
                        <HashLoader color="#3364A8" size={40} />
                    </div>
                )}
            </div>

            <div className="input-area">
                <textarea
                    placeholder="Type your legal-related question..."
                    value={userInput}
                    onChange={handleInputChange}
                ></textarea>
                <button className="send-button" onClick={handleSendClick}>Send</button>
            </div>
        </div>
    </div>
);
};

export default ChatUI;
