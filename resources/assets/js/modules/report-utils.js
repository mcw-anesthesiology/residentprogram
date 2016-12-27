import pdfmake from 'pdfmake';

export function exportIndividualReportPdf(report, subjectId){
	const filename = 'tempname.pdf';

	let content;



	let docDefinition = {
		content: content
	};

	pdfmake.createPdf(docDefinition).download(filename);
}
