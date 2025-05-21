export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 py-8 text-center text-muted-foreground bg-transparent"> {/* bg-transparent */}
      <div className="container">
        <p className="text-sm">
          &copy; {currentYear} DayDigest. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
