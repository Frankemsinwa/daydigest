
import GenerateSection from '@/components/dashboard/generate-section';
import { Separator } from '@/components/ui/separator';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* The GenerateSection component is already designed to be responsive. */}
      {/* Its tabs will stack on mobile and be in columns on larger screens. */}
      <GenerateSection />
      
      <Separator className="my-8 bg-border/50" />
      
      <section id="history" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Your History</h2>
        {/* Placeholder for history content - ensure this is responsive when implemented */}
        <div className="bg-card p-6 rounded-lg border border-border/70 text-muted-foreground">
          <p>Recent entries will be listed here (Summary, Focus, Reflection)...</p>
          <p>This section is under construction. Tables or card lists used here should be responsive.</p>
        </div>
      </section>

      <Separator className="my-8 bg-border/50" />

      <section id="quick-notes" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Quick Notes / Thought Recorder</h2>
        {/* Placeholder for quick notes - ensure this is responsive when implemented */}
        <div className="bg-card p-6 rounded-lg border border-border/70 text-muted-foreground">
          <p>A mini textarea with "Save Note" button will be here...</p>
          <p>This section is under construction. Forms used here should be responsive.</p>
        </div>
      </section>
    </div>
  );
}
