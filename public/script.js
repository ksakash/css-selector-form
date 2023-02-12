const create_button = document.getElementById("create");
create_button.addEventListener("click", initializeSelectorForm);

const save_form = document.getElementById("save_form");
save_form.addEventListener("click", saveSelectorForm);

function createEmptyRow(value) {
    var newRow = document.createElement("tr");
    var emptyCell = newRow.insertCell(0);
    var inputElement = document.createElement("input");
    inputElement.setAttribute("style", "display: none;");
    emptyCell.append(inputElement);
    var valueCell = newRow.insertCell(1);
    valueCell.setAttribute("class", "attribute_value");
    var newInput = document.createElement("input");
    newInput.setAttribute("value", value);
    valueCell.append(newInput);
    return newRow;
}

function createOneEntry(key, values, count) {
    var value = values[0];
    var selector_div = document.createElement("div");
    selector_div.setAttribute("id", count);
    var row = document.createElement("tr");
    var cell1 = row.insertCell(0);
    cell1.setAttribute("class", "attribute_key");
    var cell2 = row.insertCell(1);
    cell2.setAttribute("class", "attribute_value");
    const newInput = document.createElement("input");
    newInput.setAttribute("value", key);
    const newInput2 = document.createElement("input");
    newInput2.setAttribute("value", value);
    cell1.append(newInput);
    cell2.append(newInput2);
    cell2.setAttribute("class", "attribute_value");

    var last_row = row;
    var row_array = [row];

    for(let i = 1; i < values.length; i++) {
        var newVal = values[i];
        var newRow = createEmptyRow(newVal);
        row_array.push(newRow);
        last_row = newRow;
    }
    var btn = document.createElement("button");
    btn.textContent = "ADD";
    btn.addEventListener("click", onAddSelectorButton);
    var cell3 = last_row.insertCell(2);
    cell3.append(btn);
    for(let i = 0; i < row_array.length; i++) {
        var new_row = row_array[i];
        selector_div.appendChild(new_row);
    }
    return selector_div;
}

function addCSSSelector(div_element, key, values) {
    if (values.length == 0) {
        var row = document.createElement("tr");
        var cell1 = row.insertCell(0);
        cell1.setAttribute("class", "attribute_key");
        var cell2 = row.insertCell(1);
        cell2.setAttribute("class", "attribute_value");
        const newInput = document.createElement("input");
        newInput.setAttribute("value", key);
        const newInput2 = document.createElement("input");
        cell1.append(newInput);
        cell2.append(newInput2);
        var btn = document.createElement("button");
        btn.textContent = "ADD";
        btn.addEventListener("click", onAddSelectorButton);
        var cell3 = row.insertCell(2);
        cell3.append(btn);
        div_element.innerHTML = "";
        div_element.appendChild(row)
        return;
    }
    div_element.innerHTML = "";
    var value = values[0];
    var row = document.createElement("tr");
    var cell1 = row.insertCell(0);
    cell1.setAttribute("class", "attribute_key");
    var cell2 = row.insertCell(1);
    cell2.setAttribute("class", "attribute_value");
    const newInput = document.createElement("input");
    newInput.setAttribute("value", key);
    const newInput2 = document.createElement("input");
    newInput2.setAttribute("value", value);
    cell1.append(newInput);
    cell2.append(newInput2);
    cell2.setAttribute("class", "attribute_value");

    var last_row = row;
    var row_array = [row];

    for(let i = 1; i < values.length; i++) {
        var newVal = values[i];
        var newRow = createEmptyRow(newVal);
        row_array.push(newRow);
        last_row = newRow;
    }

    var empty_row = createEmptyRow("");
    last_row = empty_row;
    row_array.push(empty_row);
    var btn = document.createElement("button");
    btn.textContent = "ADD";
    btn.addEventListener("click", onAddSelectorButton);
    var cell3 = last_row.insertCell(2);
    cell3.append(btn);
    for(let i = 0; i < row_array.length; i++) {
        var new_row = row_array[i];
        div_element.appendChild(new_row);
    }

}

function onAddSelectorButton() {
    var currentRow = this.parentElement.parentElement;
    var inputVal = currentRow.querySelector("td.attribute_value > input").value;
    var divElement = this.parentElement.parentElement.parentElement;
    var valueElements = divElement.querySelectorAll("td.attribute_value > input");
    var attribute_key = divElement.querySelector("td.attribute_key > input").value;
    var values = [];

    for(let i = 0; i < valueElements.length; i++) {
        var attribute_value = valueElements[i].value;
        if(attribute_value == "" || attribute_value == undefined) {
            continue;
        }
        values.push(attribute_value);
    }

    addCSSSelector(divElement, attribute_key, values);
}

function createSelectorForm() {
    var temp = document.querySelector("#table");
    if (temp.childNodes.length > 1) {
        return null;
    }
    console.log("create selector form");

    var attribute_list = [
        "name",
        "img_url",
        "extracted_category",
        "extracted_mfgr",
        "mfgr_prod_id",
        "extracted_avail",
        "price",
        "rating",
        "rating_count",
        "list_price",
        "msrp",
        "delivery_time_raw",
        "delivery_time_days",
        "delivery_time_days_upto",
        "is_bestseller",
        "seller",
        "promotion",
        "reviews"
    ];
    var table = document.createElement("div");
    for(let i = 0; i < attribute_list.length; i++) {
        var attribute = attribute_list[i];
        var div_element = document.createElement("div");
        div_element.setAttribute("id", i);
        var row = document.createElement("tr");
        var cell1 = row.insertCell(0);
        cell1.setAttribute("class", "attribute_key");
        var input1 = document.createElement("input");
        input1.setAttribute("value", attribute);
        cell1.append(input1);
        var cell2 = row.insertCell(1);
        cell2.setAttribute("class", "attribute_value");
        var input2 = document.createElement("input");
        cell2.append(input2);
        var btn = document.createElement("button");
        btn.textContent = "ADD";
        btn.addEventListener("click", onAddSelectorButton);
        var cell3 = row.insertCell(2);
        cell3.append(btn);
        div_element.appendChild(row);
        table.appendChild(div_element);
    }
    return table;
}

function initializeSelectorForm() {
    var form = createSelectorForm();
    if (form == null) {
        return;
    }
    var table = document.getElementById("table");
    table.appendChild(form);
    var form_div = document.getElementById("form");
    form_div.removeAttribute("style");
}

function getContent() {
    const divs = document.querySelectorAll('#table > div > div');
    var content = {};
    for(let i = 0; i < divs.length; i++) {
        var divElement = divs[i];
        var attribute_key = divElement.querySelector('td.attribute_key > input').value;
        if(attribute_key == "") {
            continue;
        }
        content[attribute_key] = [];
        var values = divElement.querySelectorAll('tr > td.attribute_value > input');
        for(let i = 0; i < values.length; i++) {
            var val = values[i];
            if(val.value === "") {
                continue;
            }
            content[attribute_key].push(val.value);
        }
    }
    return content;
}

function download(content, fileName, contentType) {
    var content_str = JSON.stringify(content);
    var a = document.createElement("a");
    var file = new Blob([content_str], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function saveSelectorForm() {
    var fileName = "selectors.json";
    var type = "text/json;charset=utf-8";
    var content = getContent();
    download(content, fileName, type);
}
