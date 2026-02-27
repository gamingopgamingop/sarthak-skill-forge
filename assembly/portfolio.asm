; ----------------------------------------------------------------------------------------
; portfolio_win.asm - Windows x64 NASM Portfolio
; Assemble: nasm -f win64 portfolio_win.asm -o portfolio.obj
; Link:     golink /console /entry _start portfolio.obj kernel32.dll
; ----------------------------------------------------------------------------------------

extern GetStdHandle
extern WriteFile
extern ExitProcess

section .data
    msg db "--- PORTFOLIO: WINDOWS EDITION ---", 10
        db "NAME: Alex Developer", 10
        db "ROLE: Low-Level Engineer", 10
        db "OS: Windows x64 (NASM)", 10, 0
    msg_len equ $ - msg

section .bss
    bytesWritten resq 1

section .text
    global _start

_start:
    ; 1. Setup Shadow Space (Windows x64 requirement)
    sub rsp, 40             ; Allocate 32 bytes shadow space + 8 for alignment

    ; 2. Get Handle to Stdout
    mov rcx, -11            ; STD_OUTPUT_HANDLE
    call GetStdHandle
    mov rbp, rax            ; Save handle in rbp

    ; 3. Write to Console
    mov rcx, rbp            ; Argument 1: Handle
    lea rdx, [rel msg]      ; Argument 2: Buffer address
    mov r8, msg_len         ; Argument 3: Number of bytes to write
    lea r9, [rel bytesWritten] ; Argument 4: Pointer to bytes written
    mov qword [rsp + 32], 0 ; Argument 5: Must be 0 (on stack)
    call WriteFile

    ; 4. Exit
    xor rcx, rcx            ; Return code 0
    call ExitProcess