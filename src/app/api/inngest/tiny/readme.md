# Tiny Integration

Todos eventos devem comportilhar o mesmo Rate Limit e Concurrency

## Events

| Event                         | Description                                                              |
| ----------------------------- | ------------------------------------------------------------------------ |
| **tiny/tag-groups.searched**  | Será disparado sempre que uma busca é realizada no sistema.              |
| **tiny/tags.searched**        | Será disparado sempre que uma busca é realizada no sistema.              |
| **tiny/categories.searched**  | Será disparado sempre que uma busca é realizada no sistema.              |
| **tiny/products.searched**    | Será disparado sempre que uma busca é reliazada no sistema.              |
| **tiny/product.fetched**      | Será disparado sempre que uma busca é reliazada no sistema.              |
| **tiny/stock.fetched**        | Será disparado sempre que uma busca é reliazada no sistema.              |
| **tiny/partners.searched**    | Será disparado sempre que uma busca é realizada no sistema.              |
| **tiny/partner.fetched**      | Será disparado sempre que uma busca é realizada no sistema.              |
| **tiny/order.created**        | Será disparado sempre que uma ordem é criada.                            |
| **tiny/products.notify**      | Disparado pelo webhook de notificação de produtos.                       |
| **tiny/stocks.notify**        | Disparado pelo webhook de notificação de estoque.                        |
| **tiny/prices.notify**        | Disparado pelo webhook de notificação de preços.                         |
| **tiny/orders-status.notify** | Disparado pelo webhook de notificação de alteração de status de pedidos. |

## Functions

| Function                      | Description                                                                                                 | Triggers                 |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------ |
| **importTagGroupsFn**         | Importa grupos de tags.                                                                                     | tiny/tag-groups.searched |
| **importTagsFn**              | Importa tags.                                                                                               | tiny/tags.searched       |
| **importProductsFn**          | Importa dados gerais de produto, bem como aciona para cada produto importado o evento tiny/product-fetched. | tiny/products.searched   |
| **importProductDetailInfoFn** | Importa informações adicionais do produto do id recebido.                                                   | tiny/product.fetched     |
| **importProductStockFn**      | Importa dados de estoque do id do produto recebido no evento.                                               | tiny/product.fetched     |
| **importProductTagsFn**       | Renova relacionmento de tags de produto do id do produto recebido no evento.                                | tiny/product.fetched     |
| **importPartnersFn**          | Importa tags.                                                                                               | tiny/tags.searched       |
| **importPartnerDetailsFn**    | Importa tags.                                                                                               | tiny/tags.searched       |

## Flow Control

### **importTagGroupsFn**

|                 |   scope   |   key    | limit | period | burst | timeout | priority |
| --------------- | :-------: | :------: | :---: | :----: | :---: | :-----: | :------: |
| **Concurrency** | "account" | `"tiny"` |   7   |   -    |   -   |    -    |    -     |
| **Throttle**    |     -     | `"tiny"` |  30   |   1h   |   -   |    -    |    -     |
| **Rate Limit**  |     -     | `"tiny"` |  30   |   1m   |   -   |    -    |    -     |
| **Debounce**    |     -     |    -     |   -   |   -    |   -   |    -    |    -     |

### **importTagsFn**

|                 |   scope   |   key    | limit | period | burst | timeout | priority |
| --------------- | :-------: | :------: | :---: | :----: | :---: | :-----: | :------: |
| **Concurrency** | "account" | `"tiny"` |   7   |   -    |   -   |    -    |    -     |
| **Throttle**    |     -     | `"tiny"` |  30   |   1h   |   -   |    -    |    -     |
| **Rate Limit**  |     -     | `"tiny"` |  30   |   1m   |   -   |    -    |    -     |
| **Debounce**    |     -     |    -     |   -   |   -    |   -   |    -    |    -     |

### **importProductsFn**

|                 |   scope   |   key    | limit | period | burst | timeout | priority |
| --------------- | :-------: | :------: | :---: | :----: | :---: | :-----: | :------: |
| **Concurrency** | "account" | `"tiny"` |   7   |   -    |   -   |    -    |    -     |
| **Throttle**    |     -     | `"tiny"` |  30   |   1h   |   -   |    -    |    -     |
| **Rate Limit**  |     -     | `"tiny"` |  30   |   1m   |   -   |    -    |    -     |
| **Debounce**    |     -     |    -     |   -   |   -    |   -   |    -    |    -     |

### **importProductDetailInfoFn**

|                 |   scope   |   key    | limit | period | burst | timeout | priority |
| --------------- | :-------: | :------: | :---: | :----: | :---: | :-----: | :------: |
| **Concurrency** | "account" | `"tiny"` |   7   |   -    |   -   |    -    |    -     |
| **Throttle**    |     -     | `"tiny"` |  30   |   1h   |   -   |    -    |    -     |
| **Rate Limit**  |     -     | `"tiny"` |  30   |   1m   |   -   |    -    |    -     |
| **Debounce**    |     -     |    -     |   -   |   -    |   -   |    -    |    -     |

### **importProductTagsFn**

|                 |   scope   |   key    | limit | period | burst | timeout | priority |
| --------------- | :-------: | :------: | :---: | :----: | :---: | :-----: | :------: |
| **Concurrency** | "account" | `"tiny"` |   7   |   -    |   -   |    -    |    -     |
| **Throttle**    |     -     | `"tiny"` |  30   |   1h   |   -   |    -    |    -     |
| **Rate Limit**  |     -     | `"tiny"` |  30   |   1m   |   -   |    -    |    -     |
| **Debounce**    |     -     |    -     |   -   |   -    |   -   |    -    |    -     |

### **importProductStockFn**

|                 |   scope   |   key    | limit | period | burst | timeout | priority |
| --------------- | :-------: | :------: | :---: | :----: | :---: | :-----: | :------: |
| **Concurrency** | "account" | `"tiny"` |   7   |   -    |   -   |    -    |    -     |
| **Throttle**    |     -     | `"tiny"` |  30   |   1h   |   -   |    -    |    -     |
| **Rate Limit**  |     -     | `"tiny"` |  30   |   1m   |   -   |    -    |    -     |
| **Debounce**    |     -     |    -     |   -   |   -    |   -   |    -    |    -     |
