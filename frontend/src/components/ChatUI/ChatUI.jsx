import { useState, useRef } from 'react';
import { HashLoader } from 'react-spinners';
import './ChatUI.css';

const ChatUI = () => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [roleAppended, setRoleAppended] = useState(false);

    const role = "Your Role: You were hired as part of LegalProConnect AI team that specializes in providing legal services to commercial companies and individuals. As part of the legal professional's day-to-day job, you need to study US laws to provide appropriate legal suggestions to benefit the clients. You might also asked to review and generate agreements.\n";

    const textToSendRef = useRef("");

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSendClick = async () => {
        setLoading(true);

        if (!roleAppended) {
            textToSendRef.current = role;
            setRoleAppended(true);
        }

        const userQuery = "Client: " + userInput + "\n";
        textToSendRef.current += userQuery;

        const newMessage = { text: userInput, type: 'user' };
        setChatHistory((prevHistory) => [...prevHistory, newMessage]);
        setUserInput('');
        //console.log("before api: " + textToSendRef.current);

        const apiUrl = `https://ec2-3-82-21-179.compute-1.amazonaws.com:8080/bot/chat?prompt=${encodeURIComponent(textToSendRef.current)}`;

        try {
            const res = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'text/plain'
                }
            });

            if (res.ok) {
                const data = await res.text();
                // console.log("bot response: " + data);
                textToSendRef.current += "Your response: " + data + "\n";
                //console.log("after api: " + textToSendRef.current);

                // Replace newline characters with <br> tags
                const formattedData = data.replace(/\n/g, '<br>');

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
                    {chatHistory.map((message, index) => (
                        <div
                            key={`${message.id}-${index}`}
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
