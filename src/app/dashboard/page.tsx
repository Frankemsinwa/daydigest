
import GenerateSection from '@/components/dashboard/generate-section';
// import HistorySection from '@/components/dashboard/history-section'; // Placeholder for later
// import QuickNotesSection from '@/components/dashboard/quick-notes-section'; // Placeholder for later
import { Separator } from '@/components/ui/separator';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <GenerateSection />
      <Separator className="my-8 bg-border/50" />
      
      {/* Placeholder for History Section */}
      <section id="history" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Your History</h2>
        <div className="bg-card p-6 rounded-lg border border-border/70 text-muted-foreground">
          <p>Recent entries will be listed here (Summary, Focus, Reflection)...</p>
          <p>This section is under construction.</p>
        </div>
      </section>

      <Separator className="my-8 bg-border/50" />

      {/* Placeholder for Quick Notes Section */}
      <section id="quick-notes" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Quick Notes / Thought Recorder</h2>
        <div className="bg-card p-6 rounded-lg border border-border/70 text-muted-foreground">
          <p>A mini textarea with "Save Note" button will be here...</p>
          <p>This section is under construction.</p>
        </div>
      </section>
    </div>
  );
}
