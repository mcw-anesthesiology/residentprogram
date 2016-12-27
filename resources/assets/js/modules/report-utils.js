import pdfmake from 'pdfmake';

export function exportIndividualReport(){
	const filename = 'tempname.pdf';

	let content;

	

	let docDefinition = {
		content: content
	};

	pdfmake.createPdf(docDefinition).download(filename);
}
