import { config } from 'dotenv';
config();

import '@/ai/flows/generate-daily-summary.ts';
import '@/ai/flows/generate-focus-recommendations.ts';
import '@/ai/flows/generate-reflection-prompt.ts';