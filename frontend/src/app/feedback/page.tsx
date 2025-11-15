"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const appUrl = process.env.NEXT_PUBLIC_FORMBRICKS_APP_URL;
    const environmentId = process.env.NEXT_PUBLIC_FORMBRICKS_ENVIRONMENT_ID;
    const surveyId = process.env.NEXT_PUBLIC_FORMBRICKS_SURVEY_ID;
    const questionId = process.env.NEXT_PUBLIC_FORMBRICKS_QUESTION_ID;

    if (!appUrl || !environmentId || !surveyId || !questionId) {
      console.error("Formbricks environment variables are not set");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        `${appUrl}/api/v2/client/${environmentId}/responses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            surveyId: surveyId,
            finished: true,
            data: {
              [questionId]: feedback,
            },
          }),
        },
      );

      if (response.ok) {
        setSubmitted(true);
        setFeedback("");
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Link href="/" aria-label="Terug naar de homepagina">
        <ArrowLeft />
      </Link>

      <h1 className="text-3xl font-bold">Feedback</h1>

      {submitted ? (
        <div className="bg-green-100 dark:bg-green-900/20 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg">
          Bedankt voor je feedback!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="feedback"
              className="block text-sm font-medium mb-2"
            >
              Wat vind je van deze website? Heb je suggesties ter verbetering?
            </label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              rows={6}
            />
          </div>

          <Button type="submit" disabled={submitting} variant="outline">
            {submitting ? "Verzenden..." : "Verstuur feedback"}
          </Button>
        </form>
      )}
    </div>
  );
}
