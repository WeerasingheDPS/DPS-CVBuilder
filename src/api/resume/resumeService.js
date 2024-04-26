export const downloadResume = (bytesArray, fileName) =>{
    const b64toBlob = (b64Data, contentType) =>{
        contentType = contentType || '';
        let byteCharacters = atob(b64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {type: contentType});
        return blob;
      }

        var blob = b64toBlob(bytesArray, "application.pdf");
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
}