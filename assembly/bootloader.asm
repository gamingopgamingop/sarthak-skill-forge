org 0x7C00
bits 16

start:
    mov ah, 0x0E

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

times 510 - ($ - $$) db 0
dw 0xAA55