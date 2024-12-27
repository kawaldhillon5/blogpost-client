import React, { useEffect, useState } from 'react';
import { FaThumbsUp, FaExclamationTriangle  } from 'react-icons/fa';
import './request-vote.css';
import { getVotes, isVotedByUser, postVote } from '../helper-functions';
import { set } from 'lodash';


const ReqVoteComponent = ({ initialVotes = 0, initialState = false, reqID}) => {
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(initialState);
  const [error, setError] = useState(null);
  const [isErrorHovered, setIsErrorHovered] = useState(false); // Hover state


  const handleVote = async () => {
    if (!hasVoted) {
        setVotes(votes + 1);
        setHasVoted(true);
      } else {
        setVotes(votes - 1);
        setHasVoted(false);
    }
    try {
     const response = await postVote(reqID, 'req');
     if (response !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
     
    } catch (err) {
        console.error("Error voting:", err);
        setError("An error occurred while voting. Please try again later.");
        if(hasVoted){
            setVotes(votes -1)
            setHasVoted(false);
        } else {
            setVotes(votes + 1)
            setHasVoted(true);
        }
    }
  };


  useEffect(()=>{
    async function func(){
        try {
        const resp = await getVotes(reqID,'req');
        if(resp.status === 200){
            setVotes(resp.data.votes);
        } else {
            throw new Error(`HTTP error! status: ${resp.status}`);
        } } catch (err) {
            console.error("Error loading votes:", err);
            setError("An error occurred loading votes. Please try again later.");
            setHasVoted(false);
        }
    } func();
  },[]);

  useEffect(()=>{
    async function func(){
        try {
            const resp = await isVotedByUser(reqID, 'req');
            if(resp.status === 200){
                setHasVoted(resp.data);
            } else {
                throw new Error(`HTTP error! status: ${resp.status}`);
            }
        }  catch (err) {
            console.error("Error loading votes:", err);
            setError("An error occurred loading votes. Please try again later.");
            setHasVoted(false);
        }
    } func();
  },[])

  return (
    <div className="vote-container">
      <button
        className={`vote-button ${hasVoted ? 'active' : ''}`}
        onClick={handleVote}
        disabled={error}
      >
        <FaThumbsUp />
        <span className="vote-count">{votes}</span>
      </button>
      {error && (
        <div
          className="error-icon-container"
          onMouseEnter={() => setIsErrorHovered(true)}
          onMouseLeave={() => setIsErrorHovered(false)}
        >
          <FaExclamationTriangle className="error-icon" />
          {isErrorHovered && <div className="error-tooltip">{error}</div>}
        </div>
      )}
    </div>
  );
};

export default ReqVoteComponent;