from django.core.exceptions import ValidationError


def validate_content(value):
    i = 0
    for key in value:
        if value[key] != '':
            i += 1
    if i == 0:
        raise ValidationError(
            ('content dictionary does not contain file content or text content'),
            params={'value': value},
        )
    if i == 2:
        raise ValidationError(
            ('content dictionary contains both file content and text content'),
            params={'value': value},
        )
