/*
 * grocerific.js
 * Copyright (C) 2019 raffylopez <raffylopez@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

var someValue = "FOOBAR";

function Product() {
  this.id = 0;
  this.description = "";
}

function performDelete() {
  var productId = $("#delete-id").html()
  $.get("http://localhost:8888/products/delete.php?id=" + productId, 
    function(data,error) {
      $("#myTable tbody tr#product-" + productId).remove();
  })
}

function validateIsNumber(inputSelector, fieldName, labelToChange) {
  var numAsString = $(inputSelector).val()
  if(!$.isNumeric(numAsString)) {
    $(labelToChange).html("<span style='color:red'>" + fieldName+" should be numeric</span>");
    $(inputSelector).focus();
    return false
  }
  return true
}
function validateRequired(inputSelector, fieldName, labelToChange) {
  if($(inputSelector).val() == "") {
    $(labelToChange).html("<span style='color:red'>" + fieldName+" is a required field</span>");
    $(inputSelector).focus();
    return false
  }
  return true
}

function performCreate() {
  var product = new Product()
  var inputSelectors = [
    ["#new-input-description", "Description"],
    ["#new-input-size", "Size"],
    ["#new-input-price", "Price"],
    ["#new-input-aisle-id", "Aisle"],
  ];
  for(idx in inputSelectors) {
    if (validateRequired(inputSelectors[idx][0], inputSelectors[idx][1], "#lbl-new-notification") == false) return;
  }
  var numericInputSelectors = [
    ["#new-input-price", "Price"]
  ];
  for(idx in numericInputSelectors) {
    if (validateIsNumber(numericInputSelectors[idx][0], numericInputSelectors[idx][1], "#lbl-new-notification") == false) return;
  }

  product.description = $("#new-input-description").val()
  product.size = $("#new-input-size").val()
  product.price = $("#new-input-price").val()
  product.aisleId = $("#new-aisles-list").val()
  product.aisleDescription =  $("#new-aisles-list").children("option:selected").text()

  $.get("http://localhost:8888/products/new.php?description=" + product.description + "&size=" + product.size + "&price=" + product.price + "&aisle_id=" + product.aisleId, 
    function(data,error) {
      var success = data["success"] 
      if(success == 1) {
        $("#lbl-new-notification").html("Product created.")
        var id = data["new_product_id"]

        $("#myTable tbody").append(
          '<tr id="product-'+id+'">' +
          '<td><span id="product-' + id + '-id">' + id + '</span></td>' + 
          '<td><span id="product-' + id + '-description">' + product.description + '</span></td>' + 
          '<td><span id="product-' + id + '-size">' + product.size + '</span></td>' + 
          '<td><span id="product-' + id + '-price">' + product.price + '</span></td>' + 
          '<td><span id="product-' + id + '-aisle-id">' + product.aisleDescription + '</span></td>' + 
          '<td>' + 
          '<button class="btn btn-default btn-md" data-target="#b_modal_update" data-toggle="modal" style="margin-right: 10px" onclick="editClicked(' + id + ')">Edit</button>' +  // [ EDIT ]
          '<button class="btn btn-default" + onclick="deleteClicked(' + id + ')" data-toggle="modal" data-target="#b_modal_delete">&nbsp;<span class="glyphicon glyphicon-trash"></span>&nbsp;</button>' + // [ DELETE ]
          '</td></tr>')
          $("html, body").animate({scrollTop: $("#myTable").height()}, 250)
      } else {
        $("#lbl-new-notification").html("Creation failed.")
      }

  }, "json")
}
function performEdit() {
  var inputSelectors = [
    ["#input-description", "Description"],
    ["#input-size", "Size"],
    ["#input-price", "Price"],
    ["#input-aisle-id", "Aisle"],
  ];
  for(idx in inputSelectors) {
    if (validateRequired(inputSelectors[idx][0], inputSelectors[idx][1], "#lbl-update-notification") == false) return;
  }
  var numericInputSelectors = [
    ["#input-price", "Price"]
  ];
  for(idx in numericInputSelectors) {
    if (validateIsNumber(numericInputSelectors[idx][0], numericInputSelectors[idx][1], "#lbl-update-notification") == false) return;
  }

  var product = new Product()
  product.id = $("#input-id").val()
  product.description = $("#input-description").val()
  product.size = $("#input-size").val()
  product.price = $("#input-price").val()
  product.aisleId = $("#aisles-list").val()
  product.aisleDescription =  $("#aisles-list").children("option:selected").text()
  $.get("http://localhost:8888/products/update.php?id=" + product.id + "&description=" + product.description + "&size=" + product.size + "&price=" + product.price + "&aisle_id=" + product.aisleId, 
    function(data,error) {
    var rowsAffected = data["rows_affected"] 
    if(rowsAffected > 0) {
      $("#lbl-update-notification").html("Update success!")
      $("#myTable tbody tr#product-" + product.id + " span#product-" + product.id + "-description").html(product.description);
      $("#myTable tbody tr#product-" + product.id + " span#product-" + product.id + "-size").html(product.size);
      $("#myTable tbody tr#product-" + product.id + " span#product-" + product.id + "-price").html(product.price);
      $("#myTable tbody tr#product-" + product.id + " span#product-" + product.id + "-aisle-description").html(product.aisleDescription);
    } else {
      $("#lbl-update-notification").html("No changes.")
    }

  }, "json")
}

function deleteClicked(id) {
  $("#delete-id").html(id)
}

function newClicked() {
  // $("html, body").animate({scrollTop: $("#myTable").height()}, 500)
  $("#lbl-new-notification").html("")
  $.get("http://localhost:8888/aisles/all.php", 
    function(data, status) {

      $("#new-aisles-list option").remove()
      for(idx in data) {
      var aisleId = data[idx].id
      var aisleDescription = data[idx].description
      $("#new-aisles-list").append("<option value='"+aisleId+"'>"+aisleDescription+"</option>")
}
    }, "json")
}

function editClicked(id) {
  $("#lbl-update-notification").html("")

  $.get("http://localhost:8888/products/product.php?id=" + id , 
    function(data, status) {
      var product = new Product()
      product.id = data[0].id
      product.description = data[0].description
      product.size = data[0].size
      product.price = data[0].price
      product.aisleId = data[0].aisle_id

      $("#input-id").val(product.id)
      $("#input-description").val(product.description)
      $("#input-size").val(product.size)
      $("#input-price").val(product.price)
      $("#input-aisle-id").val(product.aisleId)

      $.get("http://localhost:8888/aisles/all.php", 
        function(data, status) {

          $("#aisles-list option").remove()
          for(idx in data) {
            var aisleId = data[idx].id
            var aisleDescription = data[idx].description
            if(aisleId==product.aisleId){
            $("#aisles-list").append("<option selected value='"+aisleId+"'>"+aisleDescription+"</option>")
            } else {
            $("#aisles-list").append("<option value='"+aisleId+"'>"+aisleDescription+"</option>")
          }
          } 
        }, "json")
    }, "json"
  )
}

function newProduct(id) {
  $.get("http://localhost:8888/products/get.php")
}

function loadProducts() {
  $("#myTable tbody tr").remove()
  $.get("http://localhost:8888/products/all.php",
    function(data, status) {
      for(i in data) {
        var id = data[i].id;
        var description = data[i].description;
        var size = data[i].size;
        var price = data[i].price;
        var aisleId = data[i].aisle_id;
        var aisleDescription = data[i].aisle_description;
        $("#myTable tbody").append(
          '<tr id="product-'+id+'">' +
          '<td><span id="product-' + id + '-id">' + id + '</span></td>' + 
          '<td><span id="product-' + id + '-description">' + description + '</span></td>' + 
          '<td><span id="product-' + id + '-size">' + size + '</span></td>' + 
          '<td><span id="product-' + id + '-price">' + price + '</span></td>' + 
          '<td><span id="product-' + id + '-aisle-description">' + aisleDescription + '</span></td>' + 
          '<td>' + 
          '<button class="btn btn-default btn-md" data-target="#b_modal_update" data-toggle="modal" style="margin-right: 10px" onclick="editClicked(' + id + ')">Edit</button>' +  // [ EDIT ]
          '<button class="btn btn-default" + onclick="deleteClicked(' + id + ')" data-toggle="modal" data-target="#b_modal_delete">&nbsp;<span class="glyphicon glyphicon-trash"></span>&nbsp;</button>' + // [ DELETE ]
          '</td></tr>')
        }
    }, "json")
}
$(document).ready(
  function() {
    loadProducts();
  }
)
    
