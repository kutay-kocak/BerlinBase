
Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap 192, 192
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

# Dark background
$bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#0B0C12"))
$g.FillRectangle($bgBrush, 0, 0, 192, 192)

# BVG Yellow BB
$yellowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#F0D722"))
$font = New-Object System.Drawing.Font "Arial", 64, [System.Drawing.FontStyle]::Bold

$format = New-Object System.Drawing.StringFormat
$format.Alignment = [System.Drawing.StringAlignment]::Center
$format.LineAlignment = [System.Drawing.StringAlignment]::Center

$rect = New-Object System.Drawing.RectangleF 0, 0, 192, 192
$g.DrawString("BB", $font, $yellowBrush, $rect, $format)

$bmp.Save("public/favicon-192.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save("public/apple-touch-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)

$small = New-Object System.Drawing.Bitmap $bmp, 32, 32
$small.Save("public/favicon-32.png", [System.Drawing.Imaging.ImageFormat]::Png)

$bmp.Dispose()
$small.Dispose()
Write-Host "Favicons generated successfully!"
