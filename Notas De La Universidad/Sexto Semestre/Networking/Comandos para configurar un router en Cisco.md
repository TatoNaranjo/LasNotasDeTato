---
tags:
  - Redes
date: 2024-04-02
---

Configurando un subneteo en [[Networking]]

- Al entrar en una configuración de Interfaz, aparecerá esto:

```

Router>enable
Router#
Router#configure terminal
Enter configuration commands, one per line.  End with CNTL/Z.
Router(config)#interface FastEthernet0/0
Router(config-if)#
```

- Configurando la dirección IP de la interfaz del puerto:

```
Router(config-if)#ip address 192.168.0.1 255.255.255.0
```

Se tiene que hacer el mismo comando tres veces para configurarlo completamente.

- Cuando se enciende el puerto
```
Router(config-if)#no shutdown
Router(config-if)#
%LINK-5-CHANGED: Interface FastEthernet0/0, changed state to up
%LINEPROTO-5-UPDOWN: Line protocol on Interface FastEthernet0/0, changed state to up
```