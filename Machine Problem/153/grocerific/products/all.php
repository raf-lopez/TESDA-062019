<?php
/**
 * Returns all grocerific products as JSON
 *
 * @package all.php
 * @author Raf <raffylopez@gmail.com>
 * @version 0.1
 * @copyright Raf <raffylopez@gmail.com>
 * @license MIT
 */

  require("includes.inc");
  $query = "SELECT id, description, size, price, aisle_id from grocerific.products";
  if ($conn->connect_error) {
    die(DB_CONNECT_ERROR_NOTIF);
  }

  $result = $conn->query($query);

  $accumulatedRows = [];
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
      $accumulatedRows[] = $row;
    }
    echo json_encode($accumulatedRows);
  } else {
    echo json_encode([]);
  }

  $conn->close();
