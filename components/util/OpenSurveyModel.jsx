export default function SurveyModel({ index, sender, feedback }) {
  console.log(feedback);
  console.log(sender);
  return (
    <div className="collapse bg-gray-50">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">
        {" "}
        <span className="text-sm">From</span> {sender}{" "}
      </div>
      <div className="collapse-content">
        <p> Additional Comment: <span className="text-customPurple-default">{feedback.additionalComments} </span> </p>
        <p> Experience Rating : <span className="font-bold text-customPurple-default"> {feedback.experienceRating}</span> </p>
        <p> {feedback.favoritePart} </p>
        <p> {feedback.favoriteSpeaker} </p>
        <p> Future Registration : <span className="text-customPurple-default">{feedback.futureSuggestions } </span></p>
        <p> NetWorking Opportunity : <span className="text-customPurple-default">{feedback.networkingOpportunities} </span></p>
        <p> Organization Rating <span className="font-bold text-customPurple-default"> {feedback.organizationRating} </span> </p>
        <p> Registration FeedBack : <span className=" text-customPurple-default"> {feedback.registrationFeedback } </span>   </p>
        <p> {feedback.topicsRelevant} </p>
        <p> {feedback.venueFeedback        } </p>

      </div>
    </div>
  );
}
