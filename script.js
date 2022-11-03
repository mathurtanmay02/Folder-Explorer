// HTML Table
const table = document.getElementById('table-div');
// HTML Table body
const tbody = document.getElementById('tbody');

// Function called when folder is taken as input
function fileInfo(){
    
    // Details of all the files in the folder
    const folder = document.getElementById('ctrl').files;
    console.log(folder);

    // No of files in the folder 
    const size = folder.length;
    
    if(size != 0)
    {
        let files = [];
    
        // add object in files and parameter extension in folder
        for(var i=0;i<size;i++)
        {
            const fullName = folder[i].name; 
            let file = {
                "name" : fullName.substring(0, fullName.lastIndexOf(".")).toLowerCase(),
                "index" : i
            }
            files.push(file);
            
            folder[i].extension = fullName.substring(fullName.lastIndexOf(".")+1,fullName.size);
        }
        
        // sort array files
        let sortedFiles = files.sort((f1,f2) => (f1.name > f2.name) ? 1 : (f1.name < f2.name) ? -1 : 0);
        
        // Clear any pre-existing files
        tbody.innerHTML = " ";
        
        // Displaying the data in the table
        for(var i=0;i<size;i++)
        {
            // Create cell for name 
            const name = document.createElement("td");
            const fullName = folder[sortedFiles[i].index].name;
            const text = fullName.substring(0, fullName.lastIndexOf("."));
            name.innerHTML = text;
            
            // Create cell for size
            const size = document.createElement("td");
            const fileSize = humanFileSize(folder[i].size);
            size.innerHTML = fileSize;
            
            // Create span for tooltip
            const spanName = document.createElement("span");
            spanName.innerHTML = "File Name : " + text;
            const spanExt = document.createElement("span");
            spanExt.innerHTML = "Extension : " + folder[i].extension;
            const spanSize = document.createElement("span");
            spanSize.innerHTML = "Size : " + fileSize;
            const spanModify = document.createElement("span");
            spanModify.innerHTML = "Last Modified : " + folder[i].lastModifiedDate;
            
            // create div for span
            const div = document.createElement("div");
            
            const br1 = document.createElement("br");
            const br2 = document.createElement("br");
            const br3 = document.createElement("br");

            div.appendChild(spanName);        
            div.appendChild(br1);
            div.appendChild(spanExt);
            div.appendChild(br2);
            div.appendChild(spanSize);
            div.appendChild(br3);
            div.appendChild(spanModify);
            
            div.setAttribute("class",'tooltiptext');
            
            // Create info button
            const button = document.createElement("button");
            button.innerHTML = 'INFO';
            
            button.setAttribute("class",'tooltip');
            button.appendChild(div);
            
            // Create cell for info button
            const info = document.createElement("td");
            info.appendChild(button);
            
            // Create row for the cells
            const tr = document.createElement("tr");
            tr.setAttribute("id",i);
            
            // Adding all the newly created elements
            tbody.appendChild(tr);
            tr.appendChild(name);
            tr.appendChild(size);
            tr.appendChild(info);
            
        }

        // Make the table visible
            table.style.display = 'table';
    }
      
}

// Function to convert the size of the file to human redable format
function humanFileSize(size) {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}