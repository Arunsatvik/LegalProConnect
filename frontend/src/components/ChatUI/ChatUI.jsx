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

        const apiUrl = `https://ec2-3-82-21-179.compute-1.amazonaws.com:8080/bot/chat?prompt=${encodeURIComponent(userInput)}`;

        try {
            const res = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'text/plain'
                }
            });
        
            if (res.ok) {
                const data = await res.text();
                console.log(data)
                // Replace newline characters with <br> tags
                const formattedData = data.replace(/\n/g, '<br>');
                // console.log(formattedData)
        
                // Create a new message with formatted text
                const botResponse = {
                    text: formattedData,
                    type: 'bot',
                    id: 'bot'
                };
                setChatHistory((prevHistory) => [...prevHistory, botResponse]);
            } else {
                const errorMessage = { text: "No results found.", type: 'bot', id: 'error' };
                setChatHistory((prevHistory) => [...prevHistory, errorMessage]);
            }
        } catch (error) {
            console.error("There was an error sending the data:", error);
            const errorMessage = { text: "An error occurred while processing your request.", type: 'bot', id: 'error' };
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
                    {chatHistory.map((message) => (
                        <div
                            key={message.id}
                            className={`message ${message.type}`}
                            dangerouslySetInnerHTML={{ __html: message.text }}
                        />
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
