<?php
  require("includes.inc");
  if ($conn->connect_error) {
    $conn->close();
    die(DB_CONNECT_ERROR_NOTIF);
  } else {
    $conn->close();
    die(DB_CONNECT_SUCCESS_NOTIF);
  }
?>
