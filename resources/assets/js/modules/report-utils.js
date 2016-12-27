import pdfmake from 'pdfmake';

export function exportIndividualReport(report, subjectId){
	const filename = 'tempname.pdf';

	let content;



	let docDefinition = {
		content: content
	};

	pdfmake.createPdf(docDefinition).download(filename);
}
