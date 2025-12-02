import jsPDF from "jspdf";
import "jspdf-autotable";

export function generateAttemptPDF(entry) {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(20);
  doc.text("TriviaTrek - Quiz Attempt Report", 14, 20);

  doc.setFontSize(12);
  doc.text(`Subject: ${entry.subject}`, 14, 35);
  doc.text(`Attempt #: ${entry.attemptId + 1}`, 14, 43);
  doc.text(`Date: ${new Date(entry.date).toLocaleString()}`, 14, 51);
  doc.text(`Score: ${entry.score} / ${entry.total}`, 14, 59);

  // Line
  doc.line(14, 65, 196, 65);

  // Questions Table
  if (entry.questions && entry.questions.length > 0) {
    const tableData = entry.questions.map((q, idx) => [
      idx + 1,
      q.text,
      q.selectedOption,
      q.correctOption,
      q.selectedOption === q.correctOption ? "✓" : "✗"
    ]);

    doc.autoTable({
      head: [["#", "Question", "Your Answer", "Correct Answer", "Result"]],
      body: tableData,
      startY: 75,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [0, 150, 136] },
    });
  }

  doc.save(`Quiz_Attempt_${entry.subject}_${entry.attemptId + 1}.pdf`);
}
