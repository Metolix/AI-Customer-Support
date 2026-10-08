# AI Setup Interview

Filling out `data/company_info.txt` manually can take a while. You don't have to.

This repository includes a ready-made prompt that turns ChatGPT, Claude, Gemini, Codex, or another capable AI into a **business-information interviewer**.

The AI asks the owner questions in small groups, checks for missing or contradictory information, gets a final confirmation, and then produces a complete `data/company_info.txt` replacement.

## Use the interviewer

**[Copy the full interviewer prompt](../prompts/company-info-interviewer.md)**

### One-click start

These links open a supported AI with a short instruction to use the repository's interviewer prompt. The full prompt remains provider-independent in this repository.

<p>
<a href="https://chatgpt.com/?q=Use%20the%20AI%20Customer%20Support%20company%20information%20interviewer%20from%20https%3A%2F%2Fgithub.com%2FMetolix%2FAI-Customer-Support%2Fblob%2Fmain%2Fprompts%2Fcompany-info-interviewer.md%20and%20interview%20me%20to%20create%20my%20company_info.txt%20file."><img src="https://img.shields.io/badge/Use%20with-ChatGPT-000000?logo=openai&logoColor=white" alt="Use with ChatGPT"></a>
<a href="https://claude.ai/new?q=Use%20the%20AI%20Customer%20Support%20company%20information%20interviewer%20from%20https%3A%2F%2Fgithub.com%2FMetolix%2FAI-Customer-Support%2Fblob%2Fmain%2Fprompts%2Fcompany-info-interviewer.md%20and%20interview%20me%20to%20create%20my%20company_info.txt%20file."><img src="https://img.shields.io/badge/Use%20with-Claude-D97757?logo=claude&logoColor=white" alt="Use with Claude"></a>
<a href="https://gemini.google.com/app?text=Use%20the%20AI%20Customer%20Support%20company%20information%20interviewer%20from%20https%3A%2F%2Fgithub.com%2FMetolix%2FAI-Customer-Support%2Fblob%2Fmain%2Fprompts%2Fcompany-info-interviewer.md%20and%20interview%20me%20to%20create%20my%20company_info.txt%20file."><img src="https://img.shields.io/badge/Use%20with-Gemini-4285F4?logo=google&logoColor=white" alt="Use with Gemini"></a>
<a href="https://copilot.microsoft.com/?q=Use%20the%20AI%20Customer%20Support%20company%20information%20interviewer%20from%20https%3A%2F%2Fgithub.com%2FMetolix%2FAI-Customer-Support%2Fblob%2Fmain%2Fprompts%2Fcompany-info-interviewer.md%20and%20interview%20me%20to%20create%20my%20company_info.txt%20file."><img src="https://img.shields.io/badge/Use%20with-Copilot-5E5CE6?logo=microsoft&logoColor=white" alt="Use with Copilot"></a>
</p>

If a provider does not support prefilled prompts, open it below and paste the prompt manually.

### Open an AI

| AI | Start here |
| --- | --- |
| ChatGPT | [Open ChatGPT](https://chatgpt.com/) |
| Claude | [Open Claude](https://claude.ai/new) |
| Gemini | [Open Gemini](https://gemini.google.com/) |
| Microsoft Copilot | [Open Copilot](https://copilot.microsoft.com/) |

The prompt is provider-agnostic. These are simply convenient starting points; any AI that can follow the instructions can be used.

## What the interview covers

The interviewer adapts to the business and can cover:

- Business details and contact information
- Locations, directions, parking, accessibility, and service areas
- Opening hours and holiday hours
- Products and services
- Prices and "starting at" pricing
- Appointments, orders, booking, and delivery
- Refund, cancellation, warranty, and other policies
- Frequently asked questions
- Staff information
- Promotions and payment methods
- What the AI can and cannot claim
- Unknown information and escalation to a human

It **does not ask for API keys or other secrets**.

## Finishing the setup

When the interview is complete, the AI should give you one plain-text code block containing the finished `company_info.txt`.

1. Copy the generated contents.
2. Replace the contents of `data/company_info.txt`.
3. Review it once yourself.
4. Start/restart the backend.
5. Test questions against the support assistant before putting it on a real website.

## Why this is better than a generic "fill this template" prompt

The interviewer is specifically told to:

- Ask questions instead of guessing.
- Skip irrelevant sections.
- Follow up on vague answers.
- Resolve contradictions.
- Get confirmation before generating the file.
- Preserve unknowns instead of inventing answers.
- Keep the result focused on customer support.
- Include boundaries for unavailable capabilities such as live booking.

That makes the generated knowledge file much more useful than asking an AI to invent a business profile from a few sentences.

## Important

The AI-generated file is still business-critical configuration. **Review it before deployment.** An AI can misunderstand an answer, so the business owner remains responsible for confirming prices, policies, hours, and other facts.
