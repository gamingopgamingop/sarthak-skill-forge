; bootloader.asm — 512-byte x86 bootloader
org 0x7C00
bits 16

start:
    mov ah, 0x0E      ; BIOS teletype output
    mov si, message

print:
    lodsb
    cmp al, 0
    je done
    int 0x10
    jmp print

done:
    cli
    hlt

message db "Welcome to Sarthak OS", 0

; fill remaining bytes to make 512 bytes
times 510 - ($ - $$) db 0
dw 0xAA55           ; boot signature