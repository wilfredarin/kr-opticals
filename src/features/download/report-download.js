import pdfkit from "pdfkit";
import path from "path"
import { runInContext } from "vm";



export const downloadPdf = async(req,res)=>{
    const data = req.body;
    const name = data.name?data.name:"";
    const age = data.age?data.age:"";
    const date = data.date?data.data:"";
    const refBy = data.refby?data.refby:"";
    const rSph = data.rsph?data.rsph:"";
    const rCyl= data.rcyl?data.rcyl:"";
    const rAxis = data.raxis?data.raxis:"";
    const rVn= data.rvn?data.rvn:"";
    const lSph = data.lsph?data.lsph:"";
    const lCyl= data.lcyl?data.lcyl:"";
    const lAxis = data.laxis?data.laxis:"";
    const lVn= data.lvn?data.lvn:"";
   
    const doc = new pdfkit();
    const fileName = `Opticals_.pdf`;
    const filePath = `../downloads/${fileName}`;
    const fileFontSize = 10;
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);

    // doc.image(path.join(path.resolve(),'public',"images","optical.jpg"),0,0, {
        
    //         fit: [doc.page.width, 400], // Fit to page width and height
       
    //     // fit: [250, 300],
    //     align: 'center',
    //     valign: 'center'
    //   });

    // doc.y = 400
    // doc.moveDown(1);
    doc.fontSize(16).fillColor('red').font('Helvetica-Bold').
        text(`KONDAL REDDY`,
            {align:"center"}
        );
        doc.fontSize(16).fillColor('red').
        text(`EYE CARE & OPTICALS`,
            {align:"center"}
        );
        doc.fontSize(13).fillColor('black').font('Helvetica').
        text(`Opp: Old Municipality, Main Road, TOOPRAN, Dist. Medak`,
            {align:"center"}
        );
        doc.fontSize(13).fillColor('black').font('Helvetica-Bold').
        text(`Optometrisit: CH KONDAL REDDY`,
            {align:"center"}
        );
        doc.fontSize(13).fillColor('black').font('Helvetica').
        text(`Contact No.: 9441679040`,
            {align:"center"}
        );
        doc.fontSize(13).fillColor('black').font('Helvetica').
        text(`D. Opto (S.D.E.H), ICLEAP (L.V.P.E.H)`,
            {align:"center"}
        );
        doc.fontSize(13).fillColor('black').font('Helvetica').
        text(`(Regd. No. 969/Opthal/TSPMB)`,
            {align:"center"}
        );
        doc.fontSize(13).fillColor('black').font('Helvetica').
        text(`Refraction & Contact Lens Specialist`,
            {align:"center"}
        );
        doc.text(" ")
        doc.fontSize(14).fillColor('black').font('Helvetica-Bold').
        text(`COMPUTERISED EYE TESTING`,
            {align:"center"}
        );
        const leftMargin = 60; // Left margin for keys
        const rightMargin = 400; // Right margin for values (adjust for page size)
        doc.moveDown().font('Helvetica').fontSize(fileFontSize).text(`Name: ${name}`,leftMargin);
        doc.text(`Referred By: ${refBy}`,rightMargin)
        
        doc.text(`Date: ${date}`,leftMargin);
        doc.text(`Age: 20`,rightMargin);
        doc.text(" ")
        doc.text(" ")

        let currentHeight = doc.y;
       

        const lineHeight =  13*1.15; // 
        doc.font('Helvetica-Bold').fontSize(fileFontSize+1).text("Right",leftMargin,currentHeight)
        doc.font('Helvetica-Bold').fontSize(fileFontSize+1).text("Left",rightMargin,currentHeight)
        currentHeight = doc.y;
        doc.font("Helvetica").text(`Right SPH: ${rSph}`,leftMargin,currentHeight); 
        doc.text(`Left SPH: ${rSph}`,rightMargin,currentHeight);

        doc.text(`Right CYL: ${rSph}`,leftMargin,currentHeight+lineHeight);
        doc.text(`Left CYL: ${rSph}`,rightMargin,currentHeight+lineHeight);
        

        doc.text(`Right Axis: ${rAxis}`,leftMargin,currentHeight+2*lineHeight);
        doc.text(`Left Axis: ${rAxis}`,rightMargin,currentHeight+2*lineHeight);

        doc.text(`Right Vn: ${rVn}`,leftMargin,currentHeight+3*lineHeight);
        doc.text(`Left Vn: ${lVn}`,rightMargin,currentHeight+3*lineHeight);
      
       
        
       
        doc.text(" ")
        doc.font('Helvetica-Bold').fontSize(fileFontSize+1).text("Instructions:",leftMargin);
        



        const pageWidth = doc.page.width;
        const pageHeight = doc.page.height;
        
        // Set text for the signature
        const signatureText = 'Signature: _______________';
        
        // Calculate the X and Y positions
        const textWidth = doc.widthOfString(signatureText);
        const textHeight = doc.heightOfString(signatureText);
        
        // Place the text at the bottom right with a margin
        const x = pageWidth - textWidth - 100; // 50 points margin from the right
        const y = pageHeight - textHeight - 75; // 50 points margin from the bottom
        
        // Add the signature text at the calculated position
        doc.fontSize(fileFontSize).text(signatureText, x, y);
    doc.end();
    doc.on('finish',function(){
        res.download(filePath, fileName, function(err) {
            if (err) {
            console.log(err);
            } else {
            fs.unlinkSync(filePath);
            }
        });
    });
}

