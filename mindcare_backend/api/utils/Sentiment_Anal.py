from transformers import pipeline

# 1. Sentiment Analysis Setup
sentiment_pipeline = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")


def sentiment_analysis(text):
    """
    Perform sentiment analysis on the given text.

    Args:
        text (str): The input text for sentiment analysis.

    Returns:
        dict: A dictionary containing the label and score of the sentiment.
    """
    result = sentiment_pipeline(text)[0]
    return {
        "label": result["label"],
        "score": result["score"]
    }

if __name__ == "__main__":
    # Example usage
    print(sentiment_analysis("I love programming!"))
    print(sentiment_analysis("I hate bugs."))